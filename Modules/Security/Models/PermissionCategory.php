<?php

namespace Modules\Security\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionCategory extends Model
{
    protected $guarded = ['id'];

    protected $table = 'permission_categories';

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }
}
