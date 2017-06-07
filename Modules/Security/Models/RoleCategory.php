<?php

namespace Modules\Security\Models;

use Illuminate\Database\Eloquent\Model;

class RoleCategory extends Model
{
    protected $table = 'role_categories';

    protected $guarded = ['id'];

    public function roles()
    {
        return $this->hasMany(Role::class);
    }
}
