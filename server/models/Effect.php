<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "effect".
 *
 * @property int $id
 * @property string $inner_name
 *
 * @property Picture[] $pictures
 */
class Effect extends ActiveRecord
{
    public static function tableName(): string
    {
        return '{{%effect}}';
    }

    /**
     * @return ActiveQuery
     */
    public function getPictures(): ActiveQuery
    {
        return $this->hasMany(Picture::class, ['effect_id' => 'id']);
    }
}
