<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');

            $table->string('first_name',100)->nullable();
            $table->string('last_name', 100)->nullable();
            $table->string('display_name',200)->nullable();
            $table->string('phone',30)->nullable();

            $table->integer('state_id')->unsigned()->nullable();

            $table->string('gender',20)->nullable();
            $table->date('birth_date')->nullable();

            $table->string('email',200)->nullable();
            $table->string('username',100)->unique();
            $table->string('password',200);

            $table->date('registered_date');
            $table->dateTime('last_login')->nullable();

            $table->integer('referrer_id')->unsigned()->nullable();

            $table->longText('metadata')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
