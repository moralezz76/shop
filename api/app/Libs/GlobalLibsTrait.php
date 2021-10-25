<?php

namespace App\Libs;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

//use Illuminate\Http\Client\Request;

trait GlobalLibsTrait
{
    public function getRequestToken()
    {
        $requestToken = Request()->header('request-token');
        $str = $this->decode(base64_decode($requestToken));
        list($time, $token) = explode('.', $str);
        return [
            'time' => $time,
            'token' => $token
        ];
    }

    public function decode($encoded)
    {
        $decoded = "";
        for ($i = 0; $i < strlen($encoded); $i++) {
            $b = ord($encoded[$i]);
            $a = $b ^ 51;
            $decoded .= chr($a);
        }
        return $decoded;
    }

    public function saveSessionFiles($encode_data, $session)
    {
        if (!$encode_data) return [''];
        $images = json_decode(base64_decode($encode_data), true);
        $session_id = $session->id;
        $ret = [];
        $today = date('Ymd');

        foreach ($images as $filename => $filecontent) {
            $data_file = "{$session_id}/$today/" . Str::random(40);
            Storage::disk('public')->put($data_file, $filecontent);
            $ret[] = "$filename|$data_file";
        }
        return $ret;
    }

    public function removeOldFile($imageUrl)
    {
        echo $imageUrl . "\r\n";
        if ($imageUrl) {
            list(, $path) = explode("|", $imageUrl);
            echo $path . "\r\n";
            if ($path) Storage::disk('public')->delete($path);
        }
    }

    public function dataTableResponse($model, $request)
    {

        $items = $model::count();
        $perPage = intval($request->perPage);
        $page = intval($request->page);
        $start = ($page - 1) * $perPage;
        $data = $model::skip($start)->take($perPage)->get();
        $total = intval(($items - 1) / $perPage) + 1;
        $last = $start + $perPage;
        return response()->json([
            'status' => 1,
            'data' => [
                'rows' => $data,
                'info' =>
                array_merge(
                    (array)$request->all(),
                    [
                        'total' => $total,
                        'items' => $items,
                        'showing' => ($start + 1) . " - " . ($last < $items ? $last : $items)
                    ]
                ),
            ]
        ], 200);
    }

    public function logsInfoResponse($date, $user, $request)
    {

        $page = $request->page;
        $perPage = $request->perPage;
        //$allFiles = Storage::disk('local')->allFiles('public\logs');

        $path = storage_path('app\\public\\logs');
        $u_pattern = $user === 'all' ? '*' : $user;

        $allFiles = [];
        foreach (glob($path . '\\' . $u_pattern . '\\' . $date . '\\*.*') as $filename) $allFiles[] = $filename;

        $users_id = [];
        $data = array_reduce($allFiles, function ($ret, $item) use ($date, $user, &$users_id) {
            $finfo = explode('\\', $item);
            $filename = array_pop($finfo);
            $date = array_pop($finfo);
            $user_id = array_pop($finfo);
            list($time, $method) = explode('_', $filename);
            $arr = [
                'userName' => $user_id,
                'date' => substr($date, 0, 4) . '/' . substr($date, 4, 2) . '/' . substr($date, 6),
                'time' => date('h:i:s', $time),
                'method' => $method,
                'file' => $filename,
                'path' => '../../../file/' . base64_encode("{$user_id}/{$date}/{$filename}")
            ];
            if (!in_array($user_id, $users_id)) array_push($users_id, $user_id);
            return array_merge([$arr], $ret);
        }, []);



        $filter = [];
        $start = ($page - 1) * $perPage;

        $last = 0;
        for ($t = $start; $t < $page * $perPage; ++$t) {
            if (!isset($data[$t])) break;
            $last = $t;
            $filter[] = $data[$t];
        }

        $users_arr = \App\User::whereIn('id', array_merge($users_id, [$user]))->get()->toArray();

        $users = array_reduce($users_arr, function ($ret, $item) {
            return array_merge($ret, ['u' . $item['id'] => $item['name']]);
        }, []);


        $tot = count($data);
        $total = intval(($tot - 1) / $perPage) + 1;

        $add = $start < $tot ? 1 : 0;
        $_users = [
            //'all' => 'labelAllUsers',
            //$user => $users['u' . $user]
        ];

        if (isset($users['u' . $user]))
            $_users[$user] = $users['u' . $user];

        return response()->json([
            'status' => 1,
            'data' => [
                'rows' => $filter,
                'info' =>
                array_merge(
                    (array)$request->all(),
                    [
                        'total' => $total,
                        'users' => $users,
                        'items' => $tot,
                        'showing' => ($start + $add) . " - " . ($last + $add),
                    ]
                ),
                'options' => [
                    'users' => $_users,
                    'logdate' => [$date => $date]
                ]
                /*
                [
                    'total' => $total,
                    'page' => $page,
                    'users' => $users,
                ],*/
            ],
            'log' => true
        ], 200);
    }
}
