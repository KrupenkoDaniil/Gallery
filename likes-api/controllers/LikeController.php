<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\rest\ActiveController;

class LikeController extends ActiveController
{
    public $modelClass = 'app\models\PictureLike';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],

                'Access-Control-Request-Method' => ['POST', 'DELETE'],
                'Access-Control-Request-Headers' => [],
                'Access-Control-Allow-Credentials' => false,
                'Access-Control-Max-Age' => 3600,
            ],
        ];
        return $behaviors;
    }
}
