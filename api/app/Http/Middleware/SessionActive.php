<?php

namespace App\Http\Middleware;

use Closure;
use App\Session;
use Illuminate\Support\Facades\Hash;

class SessionActive
{


    public function userSession($token, &$encode_data = '', &$password = '')
    {
        list($encode_data, $password) = explode("|", $token);
        $decode_data = base64_decode($encode_data);
        $array_data = json_decode($decode_data, true);
        $user_token = $array_data['token'];
        $currentSession = Session::where('token', $user_token)->get();
        return $currentSession->first();
    }


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $token = $request->header('token');
        if (!$token) {
            return response()->json([
                'status' => -1,
                'data' => [
                    'error' => 'noToken'
                ]
            ], 200);
        }

        $session = $this->userSession($token, $encode_data, $password);
        if ($session) {
            if (Hash::check($encode_data . $session['hashed_password'], $password)) {
                if ($request->ip() != $session['ip']) {
                    return response()->json([
                        'status' => -1,
                        'data' => [
                            'error' => 'tokenDenied'
                        ]
                    ], 200);
                }
            } else {
                return response()->json([
                    'status' => -1,
                    'data' => [
                        'error' => 'unknowToken'
                    ]
                ], 200);
            }
        } else {
            return response()->json([
                'status' => -1,
                'data' => [
                    'error' => 'unknowSession'
                ]
            ], 200);
        }


        return $next($request);
    }
}
