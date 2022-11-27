<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%effect}}`.
 */
class m221116_000002_create_effect_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%effect}}', [
            'id' => $this->primaryKey()->unsigned(),
            'inner_name' => $this->string(128)->unique(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%effect}}');
    }
}
