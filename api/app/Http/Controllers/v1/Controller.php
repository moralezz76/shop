<?php

namespace App\Http\Controllers\v1;

use App\Session;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Client\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getSession()
    {
        $token = Request()->header('token');
        list($encode_data) = explode("|", $token);
        $decode_data = base64_decode($encode_data);
        $array_data = json_decode($decode_data, true);
        $user_token = $array_data['token'];
        $currentSession = Session::where('token', $user_token);
        return $currentSession;
    }
}
