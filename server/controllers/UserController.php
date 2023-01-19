<?php

namespace app\controllers;

use Yii;
use yii\db\ActiveRecordInterface;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\Cors;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;

class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
                'Access-Control-Request-Method' => ['POST'],
                'Access-Control-Expose-Headers' => ['errors'],
            ],
        ];
        return $behaviors;
    }

    public function actions(): array
    {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate(): ActiveRecordInterface
    {
        $model = new $this->modelClass;
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->password_hash) {
            $model->password_hash = Yii::$app->getSecurity()->generatePasswordHash($model->password_hash);
        }

        if ($model->save()) {
            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', $model->getPrimaryKey(true));
            $response->getHeaders()->set('Location', Url::toRoute(['view', 'id' => $id], true));
        } elseif ($model->hasErrors()) {
            $response = Yii::$app->getResponse();
            $response->setStatusCode(422);
            $response->getHeaders()->set('errors', Json::encode($model->errors));
        } elseif (!$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
        }

        return $model;
    }
}
