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
    Route::get('login', 'v1\SessionController@login')->middleware(['active', 'logs']); //login.get
    Route::get('logout', 'v1\SessionController@logout')->middleware(['active', 'logs']); //logout.get
});

Route::group([
    'prefix' => 'v1/product'
], function ($router) {
    Route::get('all', 'v1\ProductController@index')->withoutMiddleware(['active', 'logs']); //product.get
    Route::post('create', 'v1\ProductController@create'); //product.post
});

Route::group([
    'prefix' => 'v1/resource'
], function ($router) {
    Route::get('image/{path}', 'v1\ResourceController@image');
});


Route::group([
    'prefix' => 'v1/users'
], function ($router) {
    Route::get('all', 'v1\UserController@index');
});

Route::group([
    'prefix' => 'v1/logs'
], function ($router) {
    Route::get('/get/{day}/{user}', 'v1\UserController@logs')->withoutMiddleware(['logs']); //product.get;
    Route::get('/details/{path}', 'v1\UserController@logdetail')->withoutMiddleware(['logs']);
    Route::get('/users/options', 'v1\UserController@options')->withoutMiddleware(['logs']);
    Route::get('/users/dates', 'v1\UserController@dates')->withoutMiddleware(['logs']);
});
