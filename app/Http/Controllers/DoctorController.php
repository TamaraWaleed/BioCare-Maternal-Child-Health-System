<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Traits\CanNotifyUsers;

class DoctorController extends Controller
{
    use CanNotifyUsers;

    public function dashboard(Request $request)
    {
        $search = $request->input('search');

        $query = \App\Models\User::where('role', 'mother')
            ->where('IsActive', 1);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $mothers = $query->with(['motherProfile', 'children'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $todayAppointments = \App\Models\Appointment::where('appointment_date', today()->toDateString())
            ->with(['mother', 'doctor'])
            ->orderByRaw("CASE WHEN status = 'scheduled' THEN 1 ELSE 2 END")
            ->get();

        return Inertia::render('Doctor/Dashboard', [
            'mothers' => $mothers,
            'todayAppointments' => $todayAppointments,
            'filters' => [
                'search' => $search
            ]
        ]);
    }


    public function childExamination()
    {
        $children = \App\Models\Child::with('mother')->get();
        return Inertia::render('Doctor/ChildExamination', ['children' => $children]);
    }
    public function measurements()
    {
        return Inertia::render('Doctor/Measurements');
    }

    public function followup()
    {
        // Fetch children referred for follow-up
        $records = DB::table('child_followup_referred')
            ->join('children', 'child_followup_referred.child_id', '=', 'children.id')
            ->join('users', 'children.mother_user_id', '=', 'users.id')
            ->select('child_followup_referred.*', 'children.name as child_name', 'users.name as mother_name')
            ->latest('date')
            ->get();

        return Inertia::render('Doctor/Followup', ['records' => $records]);
    }

    public function schedule()
    {
        // Fetch all appointments
        $appointments = \App\Models\Appointment::with(['mother', 'doctor', 'antenatalRecord'])
            ->orderByRaw("CASE WHEN status = 'scheduled' THEN 1 ELSE 2 END")
            ->orderBy('appointment_date', 'asc')
            ->get();

        $mothers = \App\Models\User::where('role', 'mother')->orderBy('name')->get();
        $doctors = \App\Models\User::whereIn('role', ['doctor', 'nurse'])->orderBy('name')->get();

        return Inertia::render('Doctor/Schedule', [
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

        $this->notifyNurses(
            "Doctor " . auth()->user()->name . " scheduled a new appointment.",
            route('nurse.schedule')
        );

        $this->notifyUser(
            $request->mother_user_id,
            "Doctor " . auth()->user()->name . " scheduled a new appointment for you.",
            route('mother.visits')
        );

        return redirect()->route('doctor.schedule')->with('success', 'Appointment scheduled successfully.');
    }

    //search for mother
    public function search(Request $request)
    {
        $query = $request->input('q');
        $results = [];

        if ($query) {
            $results = \App\Models\User::where('role', 'mother')
                ->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                        ->orWhere('email', 'like', "%{$query}%");
                })
                ->with(['motherProfile', 'children'])
                ->get();
        }

        if ($request->wantsJson()) {
            return response()->json($results);
        }

        return Inertia::render('Doctor/Search', [
            'query' => $query,
            'results' => $results
        ]);
    }

    public function antenatal()
    {
        $mothers = \App\Models\User::where('role', 'mother')->orderBy('name')->get();
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

        return Inertia::render('Doctor/Antenatal', [
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

        try {
            DB::beginTransaction();

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
                    'notes' => 'Antenatal Visit'
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

            // Create a new appointment for the next visit if provided
            if ($request->next_visit) {
                \App\Models\Appointment::create([
                    'mother_user_id' => $request->mother_user_id,
                    'doctor_user_id' => $request->next_doctor_user_id ?? $appointment->doctor_user_id,
                    'appointment_date' => $request->next_visit,
                    'status' => 'scheduled',
                    'notes' => 'Next Antenatal Visit'
                ]);
            }

            DB::commit();

            $this->notifyNurses(
                "Doctor " . auth()->user()->name . " saved a new antenatal record.",
                route('nurse.medical.antenatal.create')
            );

            $this->notifyUser(
                $request->mother_user_id,
                "Doctor " . auth()->user()->name . " updated your antenatal record.",
                route('mother.antenatal')
            );

            $mother = \App\Models\User::find($request->mother_user_id);
            $motherName = $mother ? $mother->name : 'a patient';
            $this->notifyRole(
                'admin',
                "Doctor " . auth()->user()->name . " saved a new antenatal record for " . $motherName . ".",
                route('admin.mothers.show', $request->mother_user_id)
            );

            if ($request->appointment_id) {
                return redirect()->route('doctor.schedule')->with('success', 'Antenatal record saved and appointment completed.');
            }

            return redirect()->route('doctor.antenatal')->with('success', 'Antenatal record saved.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to save record: ' . $e->getMessage());
        }
    }

    public function updateAppointment(Request $request, \App\Models\Appointment $appointment)
    {
        $request->validate([
            'appointment_date' => 'required|date|after_or_equal:today',
        ]);

        $appointment->update([
            'appointment_date' => $request->appointment_date,
        ]);

        $this->notifyNurses(
            "Doctor " . auth()->user()->name . " updated an appointment date.",
            route('nurse.schedule')
        );

        return redirect()->back()->with('success', 'Appointment date updated successfully.');
    }


    public function storeChildExamination(Request $request)
    {
        $request->validate([
            'child_id' => 'required|exists:children,id',
            'examination_name' => 'required',
            'result' => 'nullable',
        ]);

        // Using child_preventive_examinations table for generic child exams
        DB::table('child_preventive_examinations')->insert([
            'child_id' => $request->child_id,
            'examination_name' => $request->examination_name,
            'visit_date' => now(),
            'result' => $request->result,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->notifyNurses(
            "Doctor " . auth()->user()->name . " saved a child examination record.",
            route('nurse.medical.preventive.create')
        );

        $child = \App\Models\Child::find($request->child_id);
        if ($child) {
            $this->notifyRole(
                'admin',
                "Doctor " . auth()->user()->name . " saved a child examination record (" . $request->examination_name . ") for " . $child->name . ".",
                route('admin.mothers.show', $child->mother_user_id)
            );
        }

        return redirect()->route('doctor.child_examination')->with('success', 'Child examination saved.');
    }

    public function show(\App\Models\User $user)
    {
        if ($user->role !== 'mother') {
            return redirect()->route('doctor.dashboard')->with('error', 'Invalid patient.');
        }

        $user->load(['motherProfile', 'children.measurements', 'children.vaccinations']);

        $childIds = $user->children->pluck('id')->toArray();
        $schoolVaccinations = [];
        $preventiveExams = [];
        $newbornAssessments = [];
        $followups = [];

        if (!empty($childIds)) {
            $schoolVaccinations = DB::table('school_vaccination_program')->whereIn('child_id', $childIds)->latest()->get();
            $preventiveExams = DB::table('child_preventive_examinations')->whereIn('child_id', $childIds)->latest()->get();
            $newbornAssessments = DB::table('newborn_assessments')->whereIn('child_id', $childIds)->latest()->get();
            $followups = DB::table('child_followup_referred')->whereIn('child_id', $childIds)->latest()->get();
        }

        return Inertia::render('Doctor/Show', [
            'mother' => $user,
            'schoolVaccinations' => $schoolVaccinations,
            'preventiveExams' => $preventiveExams,
            'newbornAssessments' => $newbornAssessments,
            'followups' => $followups
        ]);
    }

    public function deleteAppointment(\App\Models\Appointment $appointment)
    {
        $appointment->delete();
        return redirect()->back()->with('success', 'Appointment deleted.');
    }
}
