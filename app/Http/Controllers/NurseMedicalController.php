<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Traits\CanNotifyUsers;

class NurseMedicalController extends Controller
{
    use CanNotifyUsers;
    public function index()
    {
        return Inertia::render('Nurse/MedicalRecords/Index');
    }

    // --- Antenatal Examination ---
    public function createAntenatal()
    {
        $mothers = User::where('role', 'mother')->orderBy('name')->get();
        // Fetch recent antenatal records
        $records = \App\Models\AntenatalRecord::with(['appointment.mother'])
            ->latest()
            ->limit(50)
            ->get()
            ->map(function ($record) {
                return [
                    'id' => $record->id,
                    'mother_name' => $record->appointment->mother->name,
                    'mother_id' => $record->appointment->mother->id,
                    'visit_date' => $record->appointment->appointment_date,
                    'blood_pressure' => $record->blood_pressure,
                    'weight' => $record->weight,
                    'next_visit' => $record->next_visit,
                ];
            });

        return Inertia::render('Nurse/MedicalRecords/Antenatal', [
            'mothers' => $mothers,
            'records' => $records
        ]);
    }

    public function storeAntenatal(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'doctor_user_id' => 'nullable|exists:users,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'next_visit' => 'nullable|date|after:date',
            'next_doctor_user_id' => 'nullable|exists:users,id',
        ]);

        if ($request->appointment_id) {
            $appointment = \App\Models\Appointment::findOrFail($request->appointment_id);
            $appointment->update([
                'status' => 'completed',
                'doctor_user_id' => $request->doctor_user_id ?? auth()->id(),
            ]);
        } else {
            $appointment = \App\Models\Appointment::create([
                'mother_user_id' => $request->mother_user_id,
                'doctor_user_id' => $request->doctor_user_id ?? auth()->id(), 
                'appointment_date' => $request->date,
                'status' => 'completed',
                'notes' => 'Antenatal Visit (Nurse)'
            ]);
        }

        \App\Models\AntenatalRecord::create([
            'appointment_id' => $appointment->id,
            'weight' => $request->weight,
            'blood_pressure' => $request->blood_pressure,
            'oedema' => $request->oedema,
            'urine_alb' => $request->urine_alb,
            'urine_sug' => $request->urine_sug,
            'fetal_heartbeat' => $request->fetal_heartbeat,
            'gestational_age_date' => $request->gestational_age_date,
            'gestational_age_size' => $request->gestational_age_size,
            'presentation' => $request->presentation,
            'complaint_management' => $request->complaint_management,
            'supplements' => $request->supplements,
        ]);

        if ($request->next_visit) {
            \App\Models\Appointment::create([
                'mother_user_id' => $request->mother_user_id,
                'doctor_user_id' => $request->next_doctor_user_id ?? $appointment->doctor_user_id,
                'appointment_date' => $request->next_visit,
                'status' => 'scheduled',
                'notes' => 'Next Antenatal Visit (Nurse)'
            ]);

            $this->notifyUser(
                $request->mother_user_id,
                "A new Antenatal visit has been scheduled for you on " . $request->next_visit,
                route('mother.visits')
            );

            if ($request->next_doctor_user_id || $appointment->doctor_user_id) {
                $this->notifyUser(
                    $request->next_doctor_user_id ?? $appointment->doctor_user_id,
                    "A new Antenatal appointment has been scheduled for your patient.",
                    route('doctor.schedule')
                );
            }
        }

        $this->notifyUser(
            $request->mother_user_id,
            "Nurse " . auth()->user()->name . " updated your antenatal record.",
            route('mother.antenatal')
        );

        $this->notifyRole(
            'doctor',
            "Nurse " . auth()->user()->name . " saved an antenatal record.",
            route('doctor.patients.show', $request->mother_user_id)
        );

        $mother = User::find($request->mother_user_id);
        $motherName = $mother ? $mother->name : 'a patient';
        $this->notifyRole(
            'admin',
            "Nurse " . auth()->user()->name . " saved an antenatal record for " . $motherName . ".",
            route('admin.mothers.show', $request->mother_user_id)
        );

        if ($request->appointment_id) {
            return redirect()->route('nurse.schedule')->with('success', 'Antenatal record saved and appointment completed.');
        }

        return redirect()->route('nurse.medical.antenatal.create')->with('success', 'Antenatal record saved.');
    }


    // --- Newborn Assessment ---
// ... (omitting unchanged methods for space, assuming replace_file_content handles the range correctly)
// Wait, replace_file_content needs EXACT match. I'll use multi_replace for safer updates if I'm not sure about the middle content.
// Actually, I'll just replace the three relevant methods.

// (I will call multi_replace instead to be safe and concise)


    // --- Newborn Assessment ---
    public function createNewbornAssessment()
    {
        // specific form for newborn
        $children = Child::with('mother')->get();
        return Inertia::render('Nurse/MedicalRecords/NewbornAssessment', [
            'children_list' => $children
        ]);
    }
    
    public function storeNewbornAssessment(Request $request)
    {
        // Validation (Basic for now)
        $request->validate([
            'child_id' => 'required|exists:children,id',
            'date_of_birth' => 'required|date',
            // Add more validations as needed
        ]);

        DB::table('newborn_assessments')->insert([
            'child_id' => $request->child_id,
            'date_of_birth' => $request->date_of_birth,
            'birth_weight' => $request->birth_weight,
            'gestational_age' => $request->gestational_age,
            'mode_of_delivery' => $request->mode_of_delivery,
            'temperature' => $request->temperature,
            'pulse' => $request->pulse,
            'resp_rate' => $request->resp_rate,
            'weight' => $request->weight,
            'height' => $request->height,
            'head_circumference' => $request->head_circumference,
            'sex' => $request->sex,
            'congenital_malformation' => $request->congenital_malformation,
            'jaundice' => $request->jaundice,
            'cyanosis' => $request->cyanosis,
            'umbilical_stump' => $request->umbilical_stump,
            'feeding' => $request->feeding,
            'remarks' => $request->remarks,
            // 'doctor_user_id' => Auth::id(), // if admin is filling it? Or select doctor?
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $child = Child::find($request->child_id);
        if ($child) {
            $this->notifyUser(
                $child->mother_user_id,
                "Nurse " . auth()->user()->name . " saved a newborn assessment for " . $child->name,
                route('mother.dashboard')
            );
            $this->notifyRole(
                'doctor',
                "Nurse " . auth()->user()->name . " saved a newborn assessment for " . $child->name,
                route('doctor.patients.show', $child->mother_user_id)
            );
            $this->notifyRole(
                'admin',
                "Nurse " . auth()->user()->name . " saved a newborn assessment for " . $child->name . ".",
                route('admin.mothers.show', $child->mother_user_id)
            );
        }

        return redirect()->route('nurse.medical.index')->with('success', 'Newborn assessment saved.');
    }

    // --- Postnatal Examination ---
    public function createPostnatal()
    {
         // Get mothers
         $mothers = User::where('role', 'mother')->get();
         return Inertia::render('Nurse/MedicalRecords/Postnatal', [
             'mothers' => $mothers
         ]);
    }

    public function storePostnatal(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'date_of_visit' => 'required|date',
        ]);

        DB::table('postnatal_examinations')->insert([
            'mother_user_id' => $request->mother_user_id,
            'assessment_status' => $request->assessment_status,
            'date_of_visit' => $request->date_of_visit,
            'days_after_delivery' => $request->days_after_delivery,
            'temperature' => $request->temperature,
            'pulse' => $request->pulse,
            'bp' => $request->bp,
            'bleeding_after_delivery' => $request->bleeding_after_delivery,
            'hb' => $request->hb,
            'dvt' => $request->dvt,
            'rupture_uterus' => $request->rupture_uterus,
            'if_rupture_yes' => $request->if_rupture_yes,
            'lochia_colour' => $request->lochia_colour,
            'incision_cs' => $request->incision_cs,
            'seizures' => $request->seizures,
            'blood_transfusion' => $request->blood_transfusion,
            'breasts' => $request->breasts,
            'fundal_height' => $request->fundal_height,
            'family_planning_counseling' => $request->family_planning_counseling,
            'fp_appointment' => $request->fp_appointment,
            'recommendations' => $request->recommendations,
            'remarks' => $request->remarks,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->notifyUser(
            $request->mother_user_id,
            "Nurse " . auth()->user()->name . " saved a postnatal examination record.",
            route('mother.postnatal')
        );

        $this->notifyRole(
            'doctor',
            "Nurse " . auth()->user()->name . " saved a postnatal examination record.",
            route('doctor.patients.show', $request->mother_user_id)
        );

        $mother = User::find($request->mother_user_id);
        $motherName = $mother ? $mother->name : 'a patient';
        $this->notifyRole(
            'admin',
            "Nurse " . auth()->user()->name . " saved a postnatal examination record for " . $motherName . ".",
            route('admin.mothers.show', $request->mother_user_id)
        );

        return redirect()->route('nurse.medical.index')->with('success', 'Postnatal examination saved.');
    }

    // --- Previous Pregnancies ---
    public function createPreviousPregnancy()
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/MedicalRecords/PreviousPregnancy', [
            'mothers' => $mothers
        ]);
    }

    public function storePreviousPregnancy(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            // 'child_name' => 'required',
        ]);

        DB::table('previous_pregnancies')->insert([
            'mother_user_id' => $request->mother_user_id,
            'child_name' => $request->child_name,
            'child_id_num' => $request->child_id_num,
            'date_of_birth' => $request->date_of_birth,
            'gestational_age' => $request->gestational_age,
            'mode_of_delivery' => $request->mode_of_delivery,
            'place_of_birth' => $request->place_of_birth,
            'complications' => $request->complications,
            'sex' => $request->sex,
            'birth_weight' => $request->birth_weight,
            'birth_outcome' => $request->birth_outcome,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->notifyRole('doctor', "Nurse " . auth()->user()->name . " saved a previous pregnancy record.", route('doctor.patients.show', $request->mother_user_id));

        $mother = User::find($request->mother_user_id);
        $motherName = $mother ? $mother->name : 'a patient';
        $this->notifyRole(
            'admin',
            "Nurse " . auth()->user()->name . " saved a previous pregnancy record for " . $motherName . ".",
            route('admin.mothers.show', $request->mother_user_id)
        );

        return redirect()->route('nurse.medical.index')->with('success', 'Previous pregnancy record saved.');
    }

    // --- Medical Obstetrical Risks ---
    public function createObstetricalRisks()
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/MedicalRecords/ObstetricalRisks', [
            'mothers' => $mothers
        ]);
    }

    public function storeObstetricalRisks(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
        ]);

        DB::table('medical_obstetrical_risks')->insert([
            'mother_user_id' => $request->mother_user_id,
            'date_of_test' => $request->date_of_test,
            'age_risk' => $request->age_risk, // < 18 or > 35
            'consecutive_abortions' => $request->consecutive_abortions, // > 3
            'perinatal_deaths' => $request->perinatal_deaths, // > 2
            'previous_cs' => $request->previous_cs,
            'one_complicated_cs' => $request->one_complicated_cs,
            'grand_multiparty' => $request->grand_multiparty, // > 5
            'puerperal_sepsis' => $request->puerperal_sepsis,
            'gestational_hypertension' => $request->gestational_hypertension,
            'preeclampsia' => $request->preeclampsia,
            'eclampsia_seizures' => $request->eclampsia_seizures,
            'uterine_surgery' => $request->uterine_surgery,
            'previous_aph' => $request->previous_aph,
            'previous_pph' => $request->previous_pph,
            'gestational_diabetes' => $request->gestational_diabetes,
            'renal_disease' => $request->renal_disease,
            'heart_disease' => $request->heart_disease,
            'dvt' => $request->dvt,
            'previous_preterm' => $request->previous_preterm,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->notifyRole('doctor', "Nurse " . auth()->user()->name . " saved an obstetrical risks record.", route('doctor.patients.show', $request->mother_user_id));

        $mother = User::find($request->mother_user_id);
        $motherName = $mother ? $mother->name : 'a patient';
        $this->notifyRole(
            'admin',
            "Nurse " . auth()->user()->name . " saved an obstetrical risks record for " . $motherName . ".",
            route('admin.mothers.show', $request->mother_user_id)
        );

        return redirect()->route('nurse.medical.index')->with('success', 'Obstetrical risks saved.');
    }

    // --- Current Risks ---
    public function createCurrentRisks()
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/MedicalRecords/CurrentRisks', [
            'mothers' => $mothers
        ]);
    }

    public function storeCurrentRisks(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'date_of_visit' => 'required|date',
        ]);
        
        // Loop for q2-q16
        $data = [
            'mother_user_id' => $request->mother_user_id,
            'date_of_visit' => $request->date_of_visit,
            'gestational_age' => $request->gestational_age,
            'others' => $request->others,
            'who_perform_assessment' => $request->who_perform_assessment,
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        for ($i = 2; $i <= 16; $i++) {
            $data["q{$i}"] = $request->input("q{$i}");
        }

        DB::table('current_risks')->insert($data);

        $this->notifyRole('doctor', "Nurse " . auth()->user()->name . " saved a current risks record.", route('doctor.patients.show', $request->mother_user_id));

        $mother = User::find($request->mother_user_id);
        $motherName = $mother ? $mother->name : 'a patient';
        $this->notifyRole(
            'admin',
            "Nurse " . auth()->user()->name . " saved a current risks record for " . $motherName . ".",
            route('admin.mothers.show', $request->mother_user_id)
        );

        return redirect()->route('nurse.medical.index')->with('success', 'Current risks record saved.');
    }

    // --- USS Examination ---
    public function createUSS()
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/MedicalRecords/USSExamination', [
            'mothers' => $mothers
        ]);
    }

    public function storeUSS(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'date' => 'required|date',
        ]);

        DB::table('uss_examinations')->insert([
            'mother_user_id' => $request->mother_user_id,
            'date' => $request->date,
            'gestation_week' => $request->gestation_week,
            'no_of_fetuses' => $request->no_of_fetuses,
            'heart_activity' => $request->heart_activity,
            'placenta' => $request->placenta,
            'presentation' => $request->presentation,
            'fetal_sex' => $request->fetal_sex,
            'quantity_liquor' => $request->quantity_liquor,
            'deep_packet_liquor' => $request->deep_packet_liquor,
            'afi_liquor' => $request->afi_liquor,
            'gs' => $request->gs,
            'crl' => $request->crl,
            'bpd' => $request->bpd,
            'fl' => $request->fl,
            'ac' => $request->ac,
            'ega' => $request->ega,
            'efw' => $request->efw,
            'edd' => $request->edd,
            'congenital_anomalies' => $request->congenital_anomalies,
            'suspected_large' => $request->suspected_large,
            'suspected_iugr' => $request->suspected_iugr,
            'suspected_small' => $request->suspected_small,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->notifyRole('doctor', "Nurse " . auth()->user()->name . " saved a USS examination record.", route('doctor.patients.show', $request->mother_user_id));

        $mother = User::find($request->mother_user_id);
        $motherName = $mother ? $mother->name : 'a patient';
        $this->notifyRole(
            'admin',
            "Nurse " . auth()->user()->name . " saved a USS examination record for " . $motherName . ".",
            route('admin.mothers.show', $request->mother_user_id)
        );

        return redirect()->route('nurse.medical.index')->with('success', 'USS examination saved.');
    }

    // --- School Vaccination Program ---
    public function createVaccination()
    {
        $children = Child::with('mother')->get();
        return Inertia::render('Nurse/MedicalRecords/SchoolVaccination', [
            'children_list' => $children
        ]);
    }

    public function storeVaccination(Request $request)
    {
        $request->validate([
            'child_id' => 'required|exists:children,id',
            'vaccine_name' => 'required|string',
            'visit_date' => 'required|date',
        ]);

        DB::table('school_vaccination_program')->insert([
            'child_id' => $request->child_id,
            'vaccine_name' => $request->vaccine_name,
            'visit_date' => $request->visit_date,
            'lot_no' => $request->lot_no,
            'vaccinator_name' => $request->vaccinator_name,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $child = Child::find($request->child_id);
        if ($child) {
            $this->notifyUser(
                $child->mother_user_id,
                "A new vaccination record (" . $request->vaccine_name . ") was added for " . $child->name,
                route('mother.vaccinations')
            );
            $this->notifyRole(
                'doctor',
                "Nurse " . auth()->user()->name . " saved a vaccination record for " . $child->name,
                route('doctor.patients.show', $child->mother_user_id)
            );
            $this->notifyRole(
                'admin',
                "Nurse " . auth()->user()->name . " saved a vaccination record (" . $request->vaccine_name . ") for " . $child->name . ".",
                route('admin.mothers.show', $child->mother_user_id)
            );
        }

        return redirect()->route('nurse.medical.index')->with('success', 'Vaccination record saved.');
    }

    // --- Child Preventive Examinations ---
    public function createPreventive()
    {
        $children = Child::with('mother')->get();
        return Inertia::render('Nurse/MedicalRecords/ChildPreventive', [
            'children_list' => $children
        ]);
    }

    public function storePreventive(Request $request)
    {
        $request->validate([
            'child_id' => 'required|exists:children,id',
            'examination_name' => 'required|string',
            'visit_date' => 'required|date',
        ]);

        DB::table('child_preventive_examinations')->insert([
            'child_id' => $request->child_id,
            'examination_name' => $request->examination_name,
            'visit_date' => $request->visit_date,
            'result' => $request->result,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $child = Child::find($request->child_id);
        if ($child) {
            $this->notifyUser(
                $child->mother_user_id,
                "A child preventive examination record was saved for " . $child->name,
                route('mother.dashboard')
            );
            $this->notifyRole(
                'doctor',
                "Nurse " . auth()->user()->name . " saved a child preventive examination for " . $child->name,
                route('doctor.patients.show', $child->mother_user_id)
            );
            $this->notifyRole(
                'admin',
                "Nurse " . auth()->user()->name . " saved a child preventive examination (" . $request->examination_name . ") for " . $child->name . ".",
                route('admin.mothers.show', $child->mother_user_id)
            );
        }

        return redirect()->route('nurse.medical.index')->with('success', 'Preventive examination record saved.');
    }

    // --- Schedule Management ---
    public function schedule()
    {
        // Fetch all appointments
        $appointments = \App\Models\Appointment::with(['mother', 'doctor', 'antenatalRecord'])
            ->orderByRaw("CASE WHEN status = 'scheduled' THEN 1 ELSE 2 END")
            ->orderBy('appointment_date', 'asc')
            ->get();

        $mothers = \App\Models\User::where('role', 'mother')->orderBy('name')->get();
        $doctors = \App\Models\User::whereIn('role', ['doctor', 'nurse'])->orderBy('name')->get();

        return Inertia::render('Nurse/Schedule', [
            'appointments' => $appointments,
            'mothers' => $mothers,
            'doctors' => $doctors
        ]);
    }

    public function storeAppointment(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'doctor_user_id' => 'nullable|exists:users,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string|max:255',
        ]);

        \App\Models\Appointment::create([
            'mother_user_id' => $request->mother_user_id,
            'doctor_user_id' => $request->doctor_user_id ?? auth()->id(),
            'appointment_date' => $request->appointment_date,
            'status' => 'scheduled',
            'notes' => $request->notes,
        ]);

        $this->notifyUser(
            $request->mother_user_id,
            "Nurse " . auth()->user()->name . " scheduled a new appointment for you.",
            route('mother.visits')
        );

        if ($request->doctor_user_id) {
            $this->notifyUser(
                $request->doctor_user_id,
                "Nurse " . auth()->user()->name . " scheduled an appointment with you.",
                route('doctor.schedule')
            );
        }

        return redirect()->route('nurse.schedule')->with('success', 'Appointment scheduled successfully.');
    }

    public function updateAppointment(Request $request, \App\Models\Appointment $appointment)
    {
        $request->validate([
            'appointment_date' => 'required|date|after_or_equal:today',
        ]);

        $appointment->update([
            'appointment_date' => $request->appointment_date,
        ]);

        $this->notifyUser(
            $appointment->mother_user_id,
            "An appointment date has been updated to " . $request->appointment_date,
            route('mother.visits')
        );

        if ($appointment->doctor_user_id) {
            $this->notifyUser(
                $appointment->doctor_user_id,
                "An appointment date for your patient has been updated.",
                route('doctor.schedule')
            );
        }

        return redirect()->back()->with('success', 'Appointment date updated successfully.');
    }

    public function deleteAppointment(\App\Models\Appointment $appointment)
    {
        $appointment->delete();
        return redirect()->back()->with('success', 'Appointment deleted.');
    }
}
