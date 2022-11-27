<?php

namespace app\commands;

use app\models\Effect;
use yii\console\Controller;
use yii\console\ExitCode;

class DataController extends Controller
{
    const EFFECTS = [
        'none',
        'chrome',
        'sepia',
        'marvin',
        'phobos',
        'heat'
    ];

    public function actionImport(): int
    {
        foreach (self::EFFECTS as $effect) {
            $effect_entity = new Effect();
            $effect_entity->inner_name = $effect;
            $effect_entity->save();
        }

        return ExitCode::OK;
    }
}
