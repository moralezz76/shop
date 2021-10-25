<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Storage;
use \App\Http\Middleware\SessionActive;
use \App\Libs\GlobalLibsTrait;
use Hamcrest\Type\IsObject;

class LogsMiddleware extends SessionActive
{

    use GlobalLibsTrait;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $expired_seconds = 10;
        $token = $request->header('token');
        $session = $this->userSession($token);

        $response = null;
        $requestToken = $this->getRequestToken();

        $user_id = $session->user_id;
        $time = $requestToken['time'];
        $date = date("Ymd", $time);
        $method = $request->method();
        $file = $requestToken['time'] . "_{$method}_" . $requestToken['token'] . '.log';
        $logPath = "logs/$user_id/$date";

        $base = base_path() . '/storage/app/public';
        $find = glob($base . "/{$logPath}/*" . $requestToken['token'] . '.log');


        if (count($find) > 0) {
            $response = [
                'status' => 0,
                'data' => [
                    'error' => 'DuplicateRequest',
                ]
            ];
        } else if (!$requestToken) {
            $response = [
                'status' => 0,
                'data' => [
                    'error' => 'InvalidRequest',
                ]
            ];
        } else if ($requestToken['time']) {
            $realTime = $requestToken['time'] + $session->unix_diff;
            if ($realTime + $expired_seconds < time()) {
                $response = [
                    'status' => 0,
                    'data' => [
                        'error' => 'RequestExpires',
                    ]
                ];
            }
        } else if ($request->isMethod('post')) {
            if ($requestToken['token'] !== $request->data_token)
                $response = [
                    'status' => 0,
                    'data' => [
                        'error' => 'RequestDenied',
                        'requestTime' => $requestToken['time'],
                        'now' => time()
                    ]
                ];
        }


        $return = response()->json($response, 200);
        if (!$response) $return = $next($request);




        $username = $session->user;
        $response = json_decode($return->getContent(), true);

        if (isset($response['log'])) {
            //unset($response['log']);
            unset($return->log);
            return $return;
        }

        $logfile = $logPath . "/{$file}";
        if (isset($response->reference)) {
            Storage::disk('public')->put('references/' . $response->reference . '/' . time(), base64_encode($logfile));
            unset($return->reference);
        }

        $logContent = [
            'info' => [
                'method' => $method,
                'url' => $request->url(),
                'username' => $username,
            ],
            'request' => $this->short_value($request->all()),
            'response' => $this->short_value($response),
            'headers' => $this->headers($request),
        ];
        Storage::disk('public')->put($logfile, json_encode($logContent));



        return $return;
    }

    public function headers($request)
    {
        return collect($request->header())->mapWithKeys(function ($values, $header) {
            return [$header => $values];
        })->all();
    }

    public function short_value($arr)
    {

        if (is_array($arr)) {
            $ret = [];
            foreach ($arr as $key => $value) {
                if (is_array($value)) {
                    $ret[$key] = $this->short_value($value);
                } else {
                    $len = strlen(json_encode($value));
                    $ret[$key] = $len > 50 ? "[$len b]" : $value;
                }
            }
        } else {
            $ret = $arr;
        }
        return $ret;
    }
}
