<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('doctor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('specialty')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('photo_path')->nullable();
            $table->timestamps();
        });

        Schema::create('nurse_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('photo_path')->nullable();
            $table->timestamps();
        });

        Schema::create('mother_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('birth_date')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('rh_factor')->nullable();
            $table->string('husband_name')->nullable();
            $table->string('husband_id_number')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('maternity_center')->nullable();
            $table->string('country')->nullable();
            $table->string('health_center_phone')->nullable();
            $table->string('photo_path')->nullable();
            $table->timestamps();
        });

        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->enum('sex', ['male', 'female']);
            $table->date('birth_date');
            $table->decimal('birth_weight', 5, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('children');
        Schema::dropIfExists('mother_profiles');
        Schema::dropIfExists('nurse_profiles');
        Schema::dropIfExists('doctor_profiles');
        Schema::dropIfExists('announcements');
    }
};
