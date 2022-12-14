<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\rest\ActiveController;

class CommentController extends ActiveController
{
    public $modelClass = 'app\models\Comment';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
            ],
        ];
        return $behaviors;
    }
}
