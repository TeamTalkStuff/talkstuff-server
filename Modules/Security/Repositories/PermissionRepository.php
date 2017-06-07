<?php
/**
 * Created by PhpStorm.
 * User: Dennis
 * Date: 07/06/2017
 * Time: 03:26 PM
 */

namespace Modules\Security\Repositories;


use Modules\Security\Models\Permission;
use Modules\Security\Models\PermissionCategory;

class PermissionRepository
{
    /**
     * @var Permission
     */
    private $permission;
    /**
     * @var PermissionCategory
     */
    private $category;


    /**
     * PermissionRepository constructor.
     * @param Permission $permission
     * @param PermissionCategory $category
     */
    public function __construct(Permission $permission, PermissionCategory $category)
    {
        $this->permission = $permission;
        $this->category = $category;
    }

    public function saveCategory(array $payLoad)
    {
        $editMode = isset($payLoad['id']) && $payLoad['id'] ? true : false;

        $category = $this->category->firstOrNew([
            'id' => $payLoad['id']
        ]);

        $category->fill([
            'name' => $payLoad['name']
        ]);

        $category->save();

        return $category;
    }

    public function savePermission($category_id, array $payLoad)
    {
        $editMode = isset($payLoad['id']) && $payLoad['id'] ? true : false;

        $permission = $this->permission->firstOrNew([
            'id' => $payLoad['id']
        ]);

        $permission->fill([
            'name' => $payLoad['name'],
            'description' => $payLoad['description'],
        ]);

        $permission->save();

        return $permission;
    }

    public function getCategories()
    {
        return $this->category->latest()->get();
    }
}