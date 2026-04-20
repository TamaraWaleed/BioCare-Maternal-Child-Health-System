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
        Schema::table('mother_profiles', function (Blueprint $table) {
            $table->string('husband_id_number')->nullable();
            $table->string('maternity_center')->nullable();
            $table->string('country')->nullable();
            $table->string('health_center_phone')->nullable();
            $table->string('photo_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mother_profiles', function (Blueprint $table) {
            $table->dropColumn(['husband_id_number', 'maternity_center', 'country', 'health_center_phone', 'photo_path']);
        });
    }
};
