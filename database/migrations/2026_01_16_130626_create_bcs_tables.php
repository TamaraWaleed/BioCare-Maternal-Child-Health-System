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
        // Add role to users
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'doctor', 'mother'])->default('mother');
        });

        // Announcments (Ads)
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->timestamps();
        });

        // Doctor Profiles
        Schema::create('doctor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('specialty')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->timestamps();
        });

        // Mother Profiles
        Schema::create('mother_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('birth_date')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('rh_factor')->nullable();
            $table->string('husband_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->timestamps();
        });

        // Children
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->enum('sex', ['male', 'female']);
            $table->date('birth_date');
            $table->decimal('birth_weight', 5, 2)->nullable(); // kg
            $table->timestamps();
        });

        // Appointments / Visits
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users');
            $table->foreignId('doctor_user_id')->nullable()->constrained('users');
            $table->date('appointment_date');
            $table->string('status')->default('scheduled'); // scheduled, completed, cancelled
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Antenatal Records (Simplified)
        Schema::create('antenatal_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->string('weight')->nullable();
            $table->string('blood_pressure')->nullable();
            $table->string('urine_test')->nullable(); // alb, sug
            $table->text('remarks')->nullable();
            $table->timestamps();
        });

        // Vaccinations (Child)
        Schema::create('vaccinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained()->onDelete('cascade');
            $table->string('vaccine_name'); // BCG, DPT1, etc.
            $table->date('scheduled_date');
            $table->date('administered_date')->nullable();
            $table->string('batch_number')->nullable();
            $table->foreignId('administered_by_user_id')->nullable()->constrained('users');
            $table->timestamps();
        });
        
        // Child Measurements
        Schema::create('child_measurements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained()->onDelete('cascade');
            $table->date('record_date');
            $table->decimal('weight', 5, 2)->nullable(); 
            $table->decimal('height', 5, 2)->nullable();
            $table->decimal('head_circumference', 5, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('child_measurements');
        Schema::dropIfExists('vaccinations');
        Schema::dropIfExists('antenatal_records');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('children');
        Schema::dropIfExists('mother_profiles');
        Schema::dropIfExists('doctor_profiles');
        Schema::dropIfExists('announcements');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
