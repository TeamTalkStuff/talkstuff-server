<?php
/**
 * Created by PhpStorm.
 * User: Dennis
 * Date: 11/05/2017
 * Time: 12:19 PM
 */

namespace Modules\Staff\Transformers;


use League\Fractal\TransformerAbstract;
use Modules\Security\Transformers\RolesTransformer;
use Modules\Staff\Models\Staff;

class StaffProfileTransformer extends TransformerAbstract
{
    public function transform(Staff $staff){
        return [
            'id' => $staff->id,
            'fullName' => $staff->fullName(),
            'username' => $staff->username,
            'email' => $staff->email,
            'roles'  => transform($staff->roles, new RolesTransformer()),
            'permissions' => $staff->allPermissions(),
        ];
    }

}