<?php

namespace app\controllers;

use Yii;
use yii\db\ActiveRecordInterface;
use yii\filters\Cors;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;
use yii\web\UploadedFile;

class EffectController extends ActiveController
{
    public $modelClass = 'app\models\Effect';

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
