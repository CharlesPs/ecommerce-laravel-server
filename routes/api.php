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

Route::post('/register', 'App\Http\Controllers\SessionController@register');
Route::post('/login', 'App\Http\Controllers\SessionController@authenticate');

Route::group(['middleware' => ['jwt.verify']], function() {

    Route::post('user','App\Http\Controllers\SessionController@getAuthenticatedUser');

    Route::get('/admin/products', 'App\Http\Controllers\AdminProductController@index');
    Route::post('/admin/products', 'App\Http\Controllers\AdminProductController@store');
    Route::put('/admin/products/{id}', 'App\Http\Controllers\AdminProductController@update');
    Route::delete('/admin/products/{id}', 'App\Http\Controllers\AdminProductController@destroy');

    Route::post('/admin/upload/image', 'App\Http\Controllers\AdminUploadController@image');
});

Route::get('/products', 'App\Http\Controllers\ProductController@index');
Route::get('/products/{id}', 'App\Http\Controllers\ProductController@show');

Route::post('/cart', 'App\Http\Controllers\CartController@index');
Route::post('/cart/add-item', 'App\Http\Controllers\CartController@addItem');
Route::post('/cart/remove-item', 'App\Http\Controllers\CartController@removeItem');

