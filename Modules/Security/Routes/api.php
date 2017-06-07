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

// FRONTEND SECURITY API
Route::group(['prefix'=>'security/talkstuff'], function(){
    Route::post('login','LoginController@jwtLogin');
    Route::any('auth-user','LoginController@getJwtUser');
});


// ADMIN CPANEL
Route::group(['prefix' => 'security','middleware'=>\Modules\Controlpanel\Http\Middleware\CPTokenAuthentication::class], function(){

    /*Route::group(['prefix'=>'users'], function(){
        Route::get('{username}/search-username', 'UserController@searchUsername');
        Route::get('{email}/search-email', 'UserController@searchEmail');
    });*/

    Route::group(['prefix'=>'roles'], function(){
        Route::get('/', 'RolesController@fetchRoles');
        Route::get('{roleId}/delete', 'RolesController@deleteRole');
        Route::get('{roleId}/get', 'RolesController@fetchRole');
        Route::post('/save', 'RolesController@saveRole');
    });

    Route::group(['prefix'=>'permissions'], function(){
        Route::get('/categories', 'PermissionsController@fetchCategories');
        Route::post('/categories', 'PermissionsController@saveCategory');

        Route::get('{roleId}/delete', 'RolesController@deleteRole');
        Route::get('{roleId}/get', 'RolesController@fetchRole');
        Route::post('/save', 'RolesController@saveRole');
    });

    Route::post('change-password','UserController@changePassword');

});
