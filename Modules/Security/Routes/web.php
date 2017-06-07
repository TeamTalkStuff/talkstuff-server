<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your module. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::group(['prefix' => 'security'], function () {

    Route::group(['prefix'=>'controlpanel'], function(){
        Route::get('/login','LoginController@showLoginForm');
        Route::any('/logout','LoginController@logout');
        Route::post('/login','LoginController@securityLogin');
    });

});
