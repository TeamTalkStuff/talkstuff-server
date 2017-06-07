<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your module. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=>'users'], function (){
    Route::get('/','UsersController@getUsers');
    Route::get('{user_id}/start-up-friends','UsersController@getStartUpFriends');

    Route::group(['prefix'=>'register'], function(){
        Route::post('/stage-one','UsersController@registerUserStage1');
        Route::post('/stage-two','UsersController@registerUserStage2');
        Route::any('{user_id}/setup-community','UsersController@setupCommunity');
        Route::post('/stage-four','UsersController@registerUserStage4');
    });


    Route::group(['prefix'=>'{id}'], function(){
        Route::get('/','UsersController@findUser');
        Route::get('/my-profile','UsersController@getUserProfile');
        Route::get('/feeds','UsersController@getUserFeeds');
    });
});
