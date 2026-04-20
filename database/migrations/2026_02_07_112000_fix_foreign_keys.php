<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Helper to safely drop FK if exists
        $dropFK = function($table, $key) {
            $fkName = "{$table}_{$key}_foreign";
            $hasFK = \Illuminate\Support\Facades\DB::select(
                "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
                 WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = 'FOREIGN KEY'",
                [env('DB_DATABASE'), $table, $fkName]
            );

            if (!empty($hasFK)) {
                Schema::table($table, function (Blueprint $t) use ($key) {
                    $t->dropForeign([$key]);
                });
            }
        };

        // 1. Appointments: doctor_user_id -> set null
        $dropFK('appointments', 'doctor_user_id');
        Schema::table('appointments', function (Blueprint $table) {
            $table->foreign('doctor_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });

        // 2. Vaccinations: administered_by_user_id -> set null
        $dropFK('vaccinations', 'administered_by_user_id');
        Schema::table('vaccinations', function (Blueprint $table) {
            $table->foreign('administered_by_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });

        // 3. Child Followup Referred: doctor_user_id -> set null
        $dropFK('child_followup_referred', 'doctor_user_id');
        Schema::table('child_followup_referred', function (Blueprint $table) {
            $table->foreign('doctor_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });

        // 4. Newborn Assessments: doctor_user_id -> set null
        $dropFK('newborn_assessments', 'doctor_user_id');
        Schema::table('newborn_assessments', function (Blueprint $table) {
            $table->foreign('doctor_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });

        // 5. Postnatal Examinations: doctor_user_id -> set null
        $dropFK('postnatal_examinations', 'doctor_user_id');
        Schema::table('postnatal_examinations', function (Blueprint $table) {
            $table->foreign('doctor_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });

        // 6. USS Examinations: doctor_user_id -> set null
        $dropFK('uss_examinations', 'doctor_user_id');
        Schema::table('uss_examinations', function (Blueprint $table) {
            $table->foreign('doctor_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });

        // 7. Medical Examinations: doctor_user_id -> set null
        $dropFK('medical_examinations', 'doctor_user_id');
        Schema::table('medical_examinations', function (Blueprint $table) {
            $table->foreign('doctor_user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         // Helper to safely drop FK if exists
        $dropFK = function($table, $key) {
            $fkName = "{$table}_{$key}_foreign";
            $hasFK = \Illuminate\Support\Facades\DB::select(
                "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
                 WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = 'FOREIGN KEY'",
                [env('DB_DATABASE'), $table, $fkName]
            );

            if (!empty($hasFK)) {
                Schema::table($table, function (Blueprint $t) use ($key) {
                    $t->dropForeign([$key]);
                });
            }
        };

        $tables = [
            'appointments', 
            'child_followup_referred', 
            'newborn_assessments', 
            'postnatal_examinations', 
            'uss_examinations', 
            'medical_examinations'
        ];

        foreach ($tables as $tableName) {
            $dropFK($tableName, 'doctor_user_id');
            Schema::table($tableName, function (Blueprint $table) {
                 // Re-add without onDelete set null (default restrict)
                 // Note: Ideally we should know if it was cascade or restrict, but restrict is default
                 $table->foreign('doctor_user_id')
                      ->references('id')
                      ->on('users');
            });
        }

        $dropFK('vaccinations', 'administered_by_user_id');
        Schema::table('vaccinations', function (Blueprint $table) {
            $table->foreign('administered_by_user_id')
                  ->references('id')
                  ->on('users');
        });
    }
};
