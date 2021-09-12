<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth Endpoints
Route::group([
    'prefix' => 'v1/session'
], function ($router) {
    Route::post('social', 'v1\SessionController@index'); //social.post
    Route::get('login', 'v1\SessionController@login')->middleware('active'); //login.get
    Route::get('logout', 'v1\SessionController@logout')->middleware('active'); //logout.get
});

Route::group([
    'prefix' => 'v1/product'
], function ($router) {
    Route::post('create', 'v1\ProductController@create'); //social.post

});
