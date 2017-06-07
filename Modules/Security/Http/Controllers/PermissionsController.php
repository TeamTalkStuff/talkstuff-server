<?php

namespace Modules\Security\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Modules\Security\Models\PermissionCategory;
use Modules\Security\Repositories\PermissionRepository;
use Modules\Security\Transformers\PermissionCategoryTransformer;

class PermissionsController extends Controller
{
    /**
     * @var PermissionRepository
     */
    private $permissionRepository;

    /**
     * PermissionsController constructor.
     * @param PermissionRepository $permissionRepository
     */
    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function fetchCategories()
    {
        $categories = $this->permissionRepository->getCategories();

        return transform($categories, new PermissionCategoryTransformer());

    }

    public function saveCategory()
    {
        $this->validate(request(), [
            'name' => 'required|unique:permission_categories'
        ]);

        $category = $this->permissionRepository->saveCategory(\request()->all());

        return transform($category, new PermissionCategoryTransformer());
    }
}
