<?php

namespace Modules\Media\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Modules\Core\Repositories\FilesRepository;
use Modules\Media\Repositories\MediaRepository;
use Modules\Media\Transformers\MediaTransformer;
use Modules\Users\Repositories\UsersRepository;

class MediaController extends Controller
{
    /**
     * @var MediaRepository
     */
    private $mediaRepository;

    /**
     * MediaController constructor.
     * @param MediaRepository $mediaRepository
     */
    public function __construct(MediaRepository $mediaRepository)
    {
        $this->mediaRepository = $mediaRepository;
    }

    public function uploadImage($userId)
    {

        $media = $this->mediaRepository->uploadImageMedia($userId, request()->file('image'));

        return transform($media, new MediaTransformer());
    }
}
