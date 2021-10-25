<?php

namespace App\Http\Controllers\v1;

use Illuminate\Support\Facades\Storage;

class ResourceController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function image($path)
    {
        $file_data = @Storage::disk('public')->get(base64_decode($path));
        @list($type, $file_data) = explode(';', $file_data);
        @list(, $file_data)      = explode(',', $file_data);
        return @base64_decode($file_data);
    }
}
