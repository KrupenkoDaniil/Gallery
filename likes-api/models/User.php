<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $created_at
 * @property string $username
 * @property string $avatar_path
 *
 * @property Picture[] $pictures
 * @property Comment[] $comments
 */
class User extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%user}}';
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            // название поля "name", атрибут "username"
            'name' => 'username',
            'avatar' => 'avatar_path',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getPictures(): ActiveQuery
    {
        return $this->hasMany(Picture::class, ['user_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getComments(): ActiveQuery
    {
        return $this->hasMany(Comment::class, ['user_id' => 'id']);
    }
}
