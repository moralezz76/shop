<?php

namespace App\Http\Controllers\v1;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    public function __construct()
    {
        $this->middleware('active');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $image = json_decode(base64_decode($request->image), true);
        $filename = array_keys($image)[0];
        $filecontent = $image[$filename];

        $data_file = Str::random(40);
        Storage::disk('public')->put($data_file, $filecontent);

        $imageUrl = "$filename|$data_file";


        $all = $request->all();
        $all['imageUrl'] = $imageUrl;
        unset($all['image']);
        $newProduct = new Product;
        $newProduct->fill($all);
        $newProduct->user_id = $this->getSession()->first()->user_id;
        $newProduct->save();

        return response()->json([
            'status' => 1,
            'filecontent' => $this->getSession()->get()
        ], 200);
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
}
