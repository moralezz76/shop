<?php

namespace App\Http\Middleware;

use Closure;
use App\Session;
use Illuminate\Support\Facades\Hash;

class SessionActive
{
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
                    'error' => 'error_no_token'
                ]
            ], 200);
        }
        list($encode_data, $password) = explode("|", $token);
        $decode_data = base64_decode($encode_data);
        $array_data = json_decode($decode_data, true);

        $user_token = $array_data['token'];

        $currentSession = Session::where('token', $user_token)->get();
        $session = $currentSession->first();
        if ($session) {
            if (Hash::check($encode_data . $session['hashed_password'], $password)) {
                if ($request->ip() != $session['ip']) {
                    return response()->json([
                        'status' => -1,
                        'data' => [
                            'error' => 'error_token_denied'
                        ]
                    ], 200);
                }
            } else {
                return response()->json([
                    'status' => -1,
                    'data' => [
                        'error' => 'error_unknow_token'
                    ]
                ], 200);
            }
        } else {
            return response()->json([
                'status' => -1,
                'data' => [
                    'error' => 'error_unknow_session'
                ]
            ], 200);
        }


        return $next($request);
    }
}
