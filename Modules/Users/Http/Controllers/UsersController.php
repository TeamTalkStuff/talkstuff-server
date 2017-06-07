<?php

namespace Modules\Users\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Modules\Posts\Transformers\PostTransformer;
use Modules\Security\Models\User;
use Modules\Users\Repositories\UsersRepository;
use Modules\Users\Transformers\UsersTransformer;

class UsersController extends Controller
{
    /**
     * @var UsersRepository
     */
    private $usersRepository;


    /**
     * UsersController constructor.
     * @param UsersRepository $usersRepository
     */
    public function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    public function findUser($id)
    {
        $user = $this->usersRepository->findById($id);

        return transform($user, new UsersTransformer());
    }

    public function getUsers()
    {
        return transform($this->usersRepository->getUsers(), new UsersTransformer());
    }

    public function getStartUpFriends($user_id){
        return transform($this->usersRepository->getStartUpFriends($user_id), new UsersTransformer());
    }

    public function registerUserStage1()
    {
        $this->validate(request(),[
           'firstName' => 'required',
           'lastName' => 'required',
           'username' => 'required|unique:users',
           'email' => 'required|email|unique:users',
           'password' => 'required',
        ]);

        return transform($this->usersRepository->saveUserStageOne(request()->all()), new UsersTransformer());
    }

    public function setupCommunity($user_id)
    {
        // todo:: connect user to friends (users) in 'iStars' group
        $user = $this->usersRepository->setupDefaultFriends($user_id);

        return [
            'user' => transform($user, new UsersTransformer()),
            'friends' => $user->getAllFriends()
        ];
    }

    public function registerUserStage2()
    {
        // return request()->all();

        $this->validate(request(),[
            'phone' => 'required',
            'state' => 'required',
            'dateOfBirth' => 'required',
            'gender' => 'required',
        ]);

        return transform($this->usersRepository->saveUserStageTwo(request()->all()), new UsersTransformer());
    }

    public function registerUserStage4()
    {
        $user = $this->usersRepository->findById(\request()->get('userId'));

        $user->update(['metadata->profileMediaSource' => \request()->get('profileMedia')['source']]);

        return transform($user, new UsersTransformer());
    }

    public function getUserProfile()
    {
        $user = getJwtUser();

        return transform($user, new UsersTransformer());
    }

    public function getUserFeeds($id)
    {
        $feeds = $this->usersRepository->getUserFeeds($id);

        return [
            'feeds' => transform($feeds->items(), new PostTransformer($id)),
            'next_page_url' => $feeds->nextPageUrl()
        ];
    }
}
