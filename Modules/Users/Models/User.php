<?php

namespace Modules\Users\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Modules\Posts\Models\Post;


class User extends Authenticatable
{
    protected $table = 'users';

    protected $guarded = ['id'];

    protected $dates = [
        'birth_date',
        'registered_date'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function friends()
    {
        return $this->belongsToMany(self::class,'user_connections', 'user_id', 'friend');
    }

    public function friendsInverseConnection()
    {
        return $this->belongsToMany(self::class,'user_connections', 'friend', 'user_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function groupsBelongingTo()
    {
        return $this->belongsToMany(Group::class,'user_groups','user_id','group_id');
    }

    // friend requests received
    public function friendRequests()
    {
        return $this->hasMany(self::class,'target');
    }

    public function sentRequests()
    {
        return $this->hasMany(self::class,'sender');
    }

    public function getMetadataAttribute($value){
        if($value){
            return json_decode($value, true);
        } else {
            return [];
        }
    }

    public function getFeeds()
    {
        return $this->posts()->latest()->get();
    }

    public function postLikes()
    {
        return $this->belongsToMany(Post::class,'post_likes','user_id','post_id')
            ->withPivot('post_id');
    }

    public function fullName()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getDisplayName()
    {
        return $this->display_name ? $this->display_name : $this->fullName();
    }

    public function getTotalFriends()
    {
        return $this->getAllFriends()->count();
    }

    public function getAllFriends()
    {
        $friends = $this->friends()->get();

        $inverseFriends = $this->friendsInverseConnection()->get();

        return $friends->merge($inverseFriends);
    }
}
