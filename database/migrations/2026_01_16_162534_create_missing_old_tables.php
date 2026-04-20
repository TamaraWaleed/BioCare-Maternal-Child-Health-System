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
        // 1. Age Charts (New in bcs2)
        Schema::create('age_charts', function (Blueprint $table) {
            $table->integer('age'); // months or years? assumed months based on data
            $table->float('weight_g');
            $table->float('height_g');
            $table->float('hc_g');
            $table->float('weight_b');
            $table->float('height_b');
            $table->float('hc_b');
        });

        // 2. Height Charts (New in bcs2)
        Schema::create('height_charts', function (Blueprint $table) {
            $table->float('height_g');
            $table->float('weight_g');
            $table->float('weight_b')->nullable();
        });

        // 3. School Vaccination Program (New in bcs2)
        Schema::create('school_vaccination_program', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('children')->onDelete('cascade');
            $table->string('vaccine_name');
            $table->date('visit_date');
            $table->string('lot_no')->nullable();
            $table->string('vaccinator_name')->nullable();
            $table->timestamps();
        });

        // 4. CBC Table
        Schema::create('cbc', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            // bcs2 has visit_date and result1..8
            $table->date('visit_date');
            for ($i = 1; $i <= 8; $i++) {
                $table->string("result{$i}")->nullable();
            }
            $table->timestamps();
        });

        // 5. Child Preventive Examinations
        Schema::create('child_preventive_examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('children')->onDelete('cascade');
            $table->string('examination_name');
            $table->date('visit_date');
            $table->string('result')->nullable();
            $table->timestamps();
        });

        // 6. Child Followup Referred
        Schema::create('child_followup_referred', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('children')->onDelete('cascade');
            $table->date('date');
            $table->string('illness_problem')->nullable();
            $table->string('treatment')->nullable();
            $table->string('notes')->nullable();
            $table->foreignId('doctor_user_id')->nullable()->constrained('users');
            $table->timestamps();
        });

        // 7. Current Risks
        Schema::create('current_risks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->date('date_of_visit');
            $table->string('gestational_age')->nullable();
            for ($i = 2; $i <= 16; $i++) {
                $table->string("q{$i}")->nullable();
            }
            $table->string('others')->nullable();
            $table->string('who_perform_assessment')->nullable();
            $table->timestamps();
        });

        // 8. Family Planning (Updated for bcs2)
        Schema::create('family_planning', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->string('q1')->nullable();
            $table->string('q2')->nullable();
            $table->string('family_planning_method')->nullable(); // New field in bcs2
            $table->string('q3')->nullable();
            $table->string('q4')->nullable();
            $table->string('q5')->nullable();
            $table->timestamps();
        });

        // 9. Lab Test
        Schema::create('lab_tests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->date('visit_date'); // bcs2 uses single visit_date
            $table->string('result1')->nullable();
            $table->string('result2')->nullable();
            $table->string('result3')->nullable();
            $table->timestamps();
        });

        // 10. Medical Examination
        Schema::create('medical_examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('doctor_user_id')->nullable()->constrained('users');
            $table->date('date');
            $table->integer('height')->nullable();
            $table->decimal('bmi', 5, 2)->nullable();
            $table->string('general_examination')->nullable();
            $table->string('head_neck')->nullable();
            $table->string('heart')->nullable();
            $table->string('breast')->nullable();
            $table->string('lung')->nullable();
            $table->string('abdomen')->nullable();
            $table->string('lower_limbs')->nullable();
            $table->string('dt_vaccination')->nullable();
            $table->string('other_vaccination')->nullable();
            $table->string('specify_vaccination')->nullable();
            $table->timestamps();
        });

        // 11. Medical Obstetrical Risks
        Schema::create('medical_obstetrical_risks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->date('date_of_test')->nullable(); // Added date
            $table->string('age_risk')->nullable();
            $table->string('consecutive_abortions')->nullable();
            $table->string('perinatal_deaths')->nullable();
            $table->string('previous_cs')->nullable();
            $table->string('one_complicated_cs')->nullable();
            $table->string('grand_multiparty')->nullable();
            $table->string('puerperal_sepsis')->nullable();
            $table->string('gestational_hypertension')->nullable();
            $table->string('preeclampsia')->nullable();
            $table->string('eclampsia_seizures')->nullable();
            $table->string('uterine_surgery')->nullable();
            $table->string('previous_aph')->nullable();
            $table->string('previous_pph')->nullable();
            $table->string('gestational_diabetes')->nullable();
            $table->string('renal_disease')->nullable();
            $table->string('heart_disease')->nullable();
            $table->string('dvt')->nullable();
            $table->string('previous_preterm')->nullable();
            $table->timestamps();
        });

        // 12. Newborn Assessment
        Schema::create('newborn_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('children')->onDelete('cascade');
            $table->string('mode_of_delivery')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('birth_weight')->nullable();
            $table->string('gestational_age')->nullable();
            $table->string('temperature')->nullable();
            $table->string('pulse')->nullable();
            $table->string('resp_rate')->nullable();
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('head_circumference')->nullable();
            $table->string('sex')->nullable();
            $table->string('congenital_malformation')->nullable();
            $table->string('jaundice')->nullable();
            $table->string('cyanosis')->nullable();
            $table->string('umbilical_stump')->nullable();
            $table->string('feeding')->nullable();
            $table->string('remarks')->nullable();
            $table->foreignId('doctor_user_id')->nullable()->constrained('users');
            $table->timestamps();
        });

        // 13. Postnatal Examination
        Schema::create('postnatal_examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->string('assessment_status')->nullable();
            $table->date('date_of_visit');
            $table->integer('days_after_delivery')->nullable();
            $table->string('temperature')->nullable();
            $table->string('pulse')->nullable();
            $table->string('bp')->nullable();
            $table->string('bleeding_after_delivery')->nullable();
            $table->string('hb')->nullable();
            $table->string('dvt')->nullable();
            $table->string('rupture_uterus')->nullable();
            $table->string('if_rupture_yes')->nullable();
            $table->string('lochia_colour')->nullable();
            $table->string('incision_cs')->nullable();
            $table->string('seizures')->nullable();
            $table->string('blood_transfusion')->nullable();
            $table->string('breasts')->nullable();
            $table->string('fundal_height')->nullable();
            $table->string('family_planning_counseling')->nullable();
            $table->date('fp_appointment')->nullable();
            $table->string('recommendations')->nullable();
            $table->string('remarks')->nullable();
            $table->foreignId('doctor_user_id')->nullable()->constrained('users');
            $table->timestamps();
        });

        // 14. Previous Pregnancies
        Schema::create('previous_pregnancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->string('child_name')->nullable();
            $table->string('child_id_num')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gestational_age')->nullable();
            $table->string('mode_of_delivery')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('complications')->nullable();
            $table->string('sex')->nullable();
            $table->string('birth_weight')->nullable();
            $table->string('birth_outcome')->nullable();
            $table->timestamps();
        });

        // 15. USS Examination
        Schema::create('uss_examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mother_user_id')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->string('gestation_week')->nullable();
            $table->integer('no_of_fetuses')->nullable();
            $table->string('heart_activity')->nullable();
            $table->string('placenta')->nullable();
            $table->string('presentation')->nullable();
            $table->string('fetal_sex')->nullable();
            $table->string('quantity_liquor')->nullable();
            $table->string('deep_packet_liquor')->nullable();
            $table->string('afi_liquor')->nullable();
            $table->string('gs')->nullable();
            $table->string('crl')->nullable();
            $table->string('bpd')->nullable();
            $table->string('fl')->nullable();
            $table->string('ac')->nullable();
            $table->string('ega')->nullable();
            $table->string('efw')->nullable();
            $table->string('edd')->nullable();
            $table->string('congenital_anomalies')->nullable();
            $table->string('suspected_large')->nullable();
            $table->string('suspected_iugr')->nullable();
            $table->string('suspected_small')->nullable();
            $table->foreignId('doctor_user_id')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('uss_examinations');
        Schema::dropIfExists('previous_pregnancies');
        Schema::dropIfExists('postnatal_examinations');
        Schema::dropIfExists('newborn_assessments');
        Schema::dropIfExists('medical_obstetrical_risks');
        Schema::dropIfExists('medical_examinations');
        Schema::dropIfExists('lab_tests');
        Schema::dropIfExists('family_planning');
        Schema::dropIfExists('current_risks');
        Schema::dropIfExists('child_followup_referred');
        Schema::dropIfExists('child_preventive_examinations');
        Schema::dropIfExists('cbc');
        Schema::dropIfExists('school_vaccination_program');
        Schema::dropIfExists('height_charts');
        Schema::dropIfExists('age_charts');
    }
};
