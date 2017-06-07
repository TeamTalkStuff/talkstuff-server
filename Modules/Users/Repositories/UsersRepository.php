<?php
/**
 * Created by PhpStorm.
 * User: Dennis
 * Date: 15/05/2017
 * Time: 05:20 PM
 */

namespace Modules\Users\Repositories;


use Illuminate\Database\DatabaseManager;
use Illuminate\Support\Facades\DB;
use Modules\Posts\Models\Post;
use Modules\Users\Events\UserWasRegistered;
use Modules\Users\Models\Comment;
use Modules\Users\Models\User;

class UsersRepository
{
    /**
     * @var User
     */
    private $user;
    /**
     * @var Comment
     */
    private $comment;
    /**
     * @var DB
     */
    private $db;

    /**
     * UsersRepository constructor.
     * @param User $user
     * @param Comment $comment
     * @param DB $db
     */
    public function __construct(User $user, Comment $comment, DatabaseManager $db)
    {
        $this->user = $user;
        $this->comment = $comment;
        $this->db = $db;
    }

    public function getUsers($limit = null)
    {
        return $this->user->all();
    }

    public function saveUser(array $payLoad)
    {
        $editMode = isset($payLoad['id']) ? true : false;

        /**
         * @var User $user
         */
        $user = $this->user->firstOrNew([
            'id' => $editMode ? $payLoad['id'] : null
        ]);

        $user->fill([
            'display_name' => isset($payLoad['displayName']) ? $payLoad['displayName'] : '',
            'first_name' => $payLoad['firstName'],
            'last_name' => $payLoad['lastName'],
            'username' => $payLoad['username'],
            'email' => $payLoad['email'],
        ]);

        if(!$editMode){
            $user->fill([
                'registered_date' => date('Y-m-d'),
            ]);
        }

        if(isset($payLoad['password'])) $user->fill(['password' => bcrypt($payLoad['password'])]);

        $user->save();

        // fire an event when creating a new user
        if(!$editMode) event(new UserWasRegistered($user, $payLoad));

        return $user;
    }


    /**
     * @param $id
     * @return User
     */
    public function findById($id)
    {
        return $this->user->find($id);
    }

    public function getUserFeeds($id)
    {
        $ids = $this->findById($id)->getAllFriends()->pluck('id')->toArray();

        $ids[] = (int)$id;

        return app(Post::class)->whereIn('user_id', $ids)->latest()->simplePaginate(3);

    }

    public function saveUserStageOne(array $payLoad)
    {
        $editMode = isset($payLoad['id']) ? true : false;

        /**
         * @var User $user
         */
        $user = $this->user->firstOrNew([
            'id' => $editMode ? $payLoad['id'] : null
        ]);

        $user->fill([
            'first_name' => $payLoad['firstName'],
            'last_name' => $payLoad['lastName'],
            'username' => $payLoad['username'],
            'email' => $payLoad['email'],
        ]);

        if(!$editMode){
            $user->fill([
                'registered_date' => date('Y-m-d'),
            ]);
        }

        if(isset($payLoad['password'])) $user->fill(['password' => bcrypt($payLoad['password'])]);

        $user->save();

        // fire an event when creating a new user
        if(!$editMode) event(new UserWasRegistered($user, $payLoad));

        return $user;

    }

    public function saveUserStageTwo(array $payLoad)
    {
        $editMode = isset($payLoad['id']) ? true : false;

        /**
         * @var User $user
         */
        $user = $this->findById($payLoad['id']);

        $user->fill([
            'state_id' => $payLoad['state'],
            'gender' => $payLoad['gender'],
            'phone' => $payLoad['phone'],
            'birth_date' => $payLoad['dateOfBirth'],
        ]);

        $user->save();

        return $user;
    }

    public function getStartUpFriends($user_id)
    {
        return $this->user->where('id','<>',$user_id)->get();
    }

    public function addFriend()
    {

    }

    public function setupDefaultFriends($user_id)
    {
        $user = $this->findById($user_id);

        /**
         * @var GroupRepository $groupRepo
         */
        $groupRepo = app(GroupRepository::class);

        $defaultGroup = $groupRepo->getDefaultGroup();

        $user->friends()->sync($defaultGroup->users()->get(['users.id']));

        return $user;
    }


}