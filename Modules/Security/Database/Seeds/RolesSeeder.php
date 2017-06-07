<?php

namespace Modules\Security\Database\Seeds;

use Illuminate\Database\Seeder;
use Modules\Security\Models\Role;
use Modules\Security\Models\RoleCategory;
use Modules\Security\Repositories\RoleRepository;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * @var RoleRepository $roleRepo
         */
        $roleRepo = app(RoleRepository::class);
        Role::truncate();
        RoleCategory::truncate();


        // todo:: create role categories
        $categories = [
            [
                'name' => 'adminCPanel'
            ],
            [
                'name' => 'userFrontend'
            ]
        ];
        foreach ($categories as $category){
            $roleRepo->saveRoleCategory($category);
        }

        // todo:: create roles
        $admin_cpanel_role_category = $roleRepo->getCategoryByName('adminCPanel');
        $roles = [
            [
                'name' => 'super_admin',
                'description' => 'Super Admin',
                'category_id' => $admin_cpanel_role_category->id
            ],
            [
                'name' => 'admin',
                'description' => 'Admin',
                'category_id' => $admin_cpanel_role_category->id
            ]
        ];

        foreach ($roles as $role){
            $roleRepo->saveRole($role);
        }
    }
}
