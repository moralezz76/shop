<?php

namespace App\Http\Controllers\v1;

use App\Libs\GlobalLibsTrait;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{

    use GlobalLibsTrait;

    public function __construct()
    {
        $this->middleware(['active', 'logs']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = \App\User::class;
        return $this->dataTableResponse($data, request());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Logs
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function logs($date, $user)
    {
        $data = \App\User::class;
        return $this->logsInfoResponse($date, $user, request());
    }

    public function logdetail($path)
    {
        $logPath = storage_path('app\\public\\logs');

        return response()->json([
            'status' => 1,
            'data' => json_decode(file_get_contents($logPath . '\\' . base64_decode($path)), true),
            'log' => true
        ], 200);
    }

    public function options()
    {

        $search = request()->value;

        $found = \App\User::Where('name', 'LIKE', '%' . $search . '%')->get()->toArray();
        $to_options = array_reduce($found, function ($ret, $item) {
            return array_merge($ret, [['value' => $item['id'], 'label' => $item['name']]]);
        }, []);

        return response()->json([
            'status' => 1,
            'data' => $to_options,
        ], 200);
    }

    public function dates()
    {
        $search = request()->value;
        $path = storage_path('app\\public\\logs');
        $allFolders = [];
        $tmp = [];
        foreach (glob($path . '\\*\\*') as $folder) {
            $pt = explode('\\', $folder);
            $last = array_pop($pt);
            if (strpos($last, $search) !== false && !in_array($last, $tmp)) {
                $allFolders[] = ['label' => $last, 'value' => $last];
                $tmp[] = $last;
            }
        }

        return response()->json([
            'status' => 1,
            'data' => $allFolders,
        ], 200);
    }
}
