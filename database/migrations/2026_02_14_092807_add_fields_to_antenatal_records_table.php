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
        Schema::table('antenatal_records', function (Blueprint $table) {
            $table->string('oedema')->nullable();
            $table->string('urine_alb')->nullable(); // For Albumin (radio or value)
            $table->string('urine_sug')->nullable(); // For Sugar (radio or value)
            $table->string('fetal_heartbeat')->nullable(); // +ve or -ve
            $table->date('gestational_age_date')->nullable();
            $table->string('gestational_age_size')->nullable(); // Size/cm
            $table->string('presentation')->nullable();
            $table->text('complaint_management')->nullable(); // Complaint, Management, Medication & Remarks
            $table->string('supplements')->nullable(); // Iron+F.A
            $table->date('next_visit')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('antenatal_records', function (Blueprint $table) {
            $table->dropColumn([
                'oedema',
                'urine_alb',
                'urine_sug',
                'fetal_heartbeat',
                'gestational_age_date',
                'gestational_age_size',
                'presentation',
                'complaint_management',
                'supplements',
                'next_visit',
            ]);
        });
    }
};
