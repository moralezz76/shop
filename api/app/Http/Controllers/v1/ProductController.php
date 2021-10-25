<?php

namespace App\Http\Controllers\v1;

use App\Libs\GlobalLibsTrait;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
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
        return response()->json([
            'status' => 1,
            'data' => [
                'products' => \App\Product::all(),
            ]
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $session = $this->getSession()->first();
        $all = $request->all();

        $filenames = $this->saveSessionFiles($request->image, $session);
        $all['imageUrl'] = count($filenames) ? $filenames[0] : '';
        unset($all['image']);

        if ($request->id) {
            $currProduct = Product::where('id', $request->id)->get()->first();
            if ($all['imageUrl']) $this->removeOldFile($currProduct->imageUrl); // delete old img here...
        } else {
            $currProduct = new Product;
            $currProduct->user_id = $session->user_id;
        }
        $currProduct->fill($all);
        $currProduct->save();

        return response()->json([
            'status' => 1,
            'data' => ['products' => \App\Product::all(),],
            'reference' => 'product/' . $currProduct->id
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
