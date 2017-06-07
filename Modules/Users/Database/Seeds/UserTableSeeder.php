<?php

namespace Modules\Users\Database\Seeds;

use Illuminate\Database\Seeder;
use Modules\Posts\Models\Post;
use Modules\Users\Models\Group;
use Modules\Users\Models\User;
use Modules\Users\Repositories\UsersRepository;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Modules\Users\Models\User::truncate();
        \Modules\Users\Models\Group::truncate();

        $startUpGroup = Group::firstOrCreate([
            'name' => 'iStars',
            'reserved' => true
        ]);

        factory(\Modules\Users\Models\User::class, 10)->create()->each(function ($u) use($startUpGroup) {
            /**
             * @var User $u
             */
            $u->groupsBelongingTo()->attach($startUpGroup->id);
            $u->posts()->create([
                'content' => 'Testing post seeds from ' . $u->fullName()
            ]);
        });

    }
}
