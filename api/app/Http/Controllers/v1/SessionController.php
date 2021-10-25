<?php

namespace App\Http\Controllers\v1;

use App\Libs\GlobalLibsTrait;
use Illuminate\Http\Request;
use App\User;
use App\Session;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SessionController extends Controller
{

    use GlobalLibsTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) // ------------- SOCIAL LOGIN ---------------
    {

        // if not exist -> insert


        $accessToken = $request->get('accessToken');
        $socialName = $request->get('socialName');
        $email = $request->get('email');

        //https://graph.facebook.com/me?access_token=xxxxxx
        //https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=xxxxxx


        $url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
        if ($socialName === 'facebook')
            $url = 'https://graph.facebook.com/me?access_token=';

        $result = @file_get_contents($url . $accessToken);
        $array_result = @json_decode($result);

        $social_id = isset($array_result->user_id) ? $array_result->user_id : (isset($array_result->id) ? $array_result->id : 0);

        if (!$social_id) {
            return response()->json([
                'status' => 0,
                'data' => [
                    'error' => 'unknow_social_session'
                ]
            ], 200);
        }

        $currentUser = User::where('email', $email)->get()->first();

        if (!isset($currentUser->id)) {
            $allData = $request->all();
            unset($allData['accessToken']);
            $currentUser = User::create($allData);
        }

        $id = $currentUser->id;
        $session_data = ['user_id' => $id, 'token' => Str::random(16), 'hashed_password' => Str::random(16), 'ip' => $request->ip()];

        $currentSession = Session::where('user_id', $id)->get()->first();
        if (!isset($currentSession->id)) {
            $currentSession = new Session;
            $currentSession->fill($session_data);
            $currentSession['unix_diff'] = time() - $this->getRequestToken()['time'];
            $currentSession->save();
        } else {
            $currentSession->update($session_data);
        }

        $str = json_encode(['token' => $currentSession->first()->token]);
        $code = base64_encode($str);

        $user = $currentUser;
        return response()->json([
            'status' => 1,
            'id' => $id,
            'token' => $code . '|' . Hash::make($code . $currentSession->first()->hashed_password),
            'data' => [
                'session' => ['email' => $user->email, 'name'  => $user->name, 'imageUrl' => $user->imageUrl],
                'roles' => $user->roles
            ]
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        return response()->json([
            'status' => 1,
            'data' => [
                'isValid' => true,
                'roles' => $this->getSession()->first()->user->roles,

            ]
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {

        $this->getSession()->delete();
        return response()->json([
            'status' => 1,
            'token' => null,
            'data' => [
                'logout' => true,
            ]
        ], 200);
    }
}
