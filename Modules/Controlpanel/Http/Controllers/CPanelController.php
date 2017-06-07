<?php

namespace Modules\Controlpanel\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Modules\Staff\Transformers\StaffProfileTransformer;
use Illuminate\Contracts\Auth\Factory as Auth;


class CPanelController extends Controller
{
    /**
     * @var Auth
     */
    private $auth;

    /**
     * CPanelController constructor.
     * @param Auth $auth
     */
    public function __construct(Auth $auth)
    {
        \Theme::setActive('controlPanel');
        $this->auth = $auth;
    }

    public function app()
    {
        return \Theme::view('controlPanel::app');
    }

    public function load()
    {
        $user = transform($this->auth->guard('controlPanel')->user(), new StaffProfileTransformer());

        return response()->json([
            'user' => $user
        ]);
    }

}
