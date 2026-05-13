<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MotherController extends Controller
{
    public function dashboard()
    {
        $user = \Illuminate\Support\Facades\Auth::user();
        $user->load(['children.vaccinations', 'children.measurements', 'motherProfile']);

        $announcements = \App\Models\Announcement::latest()->take(3)->get();
        
        $upcomingVisits = \App\Models\Appointment::where('mother_user_id', $user->id)
            ->where('status', 'scheduled')
            ->orderBy('appointment_date', 'asc')
            ->take(3)
            ->get();
            
        return Inertia::render('Mother/Dashboard', [
            'mother' => $user,
            'announcements' => $announcements,
            'upcomingVisits' => $upcomingVisits
        ]);
    }

    public function previousPregnancies() 
    { 
        $records = \Illuminate\Support\Facades\DB::table('previous_pregnancies')
            ->where('mother_user_id', auth()->id())
            ->get();
        return Inertia::render('Mother/PreviousPregnancies', ['records' => $records]); 
    }

    public function risks() 
    { 
        $obstetrical = \Illuminate\Support\Facades\DB::table('medical_obstetrical_risks')
            ->where('mother_user_id', auth()->id())
            ->first();
            
        $current = \Illuminate\Support\Facades\DB::table('current_risks')
            ->where('mother_user_id', auth()->id())
            ->latest('date_of_visit')
            ->get();

        return Inertia::render('Mother/Risks', [
            'obstetrical' => $obstetrical,
            'current' => $current
        ]); 
    }

    public function uss() 
    { 
        $records = \Illuminate\Support\Facades\DB::table('uss_examinations')
            ->where('mother_user_id', auth()->id())
            ->latest('date')
            ->get();
        return Inertia::render('Mother/USS', ['records' => $records]); 
    }

    public function antenatal() 
    { 
        // antenatal_records linked via appointments
        $records = \App\Models\Appointment::where('mother_user_id', auth()->id())
            ->with(['antenatalRecord', 'doctor'])
            ->whereHas('antenatalRecord') // Only appointments with antenatal records
            ->latest('appointment_date')
            ->get();
            
        return Inertia::render('Mother/Antenatal', ['records' => $records]); 
    }

    public function postnatal() 
    { 
        $records = \Illuminate\Support\Facades\DB::table('postnatal_examinations')
            ->where('mother_user_id', auth()->id())
            ->latest('date_of_visit')
            ->get();
        return Inertia::render('Mother/Postnatal', ['records' => $records]); 
    }

    public function vaccinations() 
    { 
        $children = \App\Models\Child::where('mother_user_id', auth()->id())
            //->with('schoolVaccinations') // If we have relationship, or use query below
            ->get();
            
        // For school vaccinations (custom table), we might need manual fetch or relationship
        // Let's assume we want to show both generic vaccinations (if any) and school program
        
        foreach($children as $child) {
            $child->school_vaccinations = \Illuminate\Support\Facades\DB::table('school_vaccination_program')
                ->where('child_id', $child->id)
                ->get();
                
            $child->preventive_exams = \Illuminate\Support\Facades\DB::table('child_preventive_examinations')
                ->where('child_id', $child->id)
                ->get();
        }

        return Inertia::render('Mother/Vaccinations', ['children' => $children]); 
    }

    public function measurements()
    {
        $children = \App\Models\Child::where('mother_user_id', auth()->id())
            ->with(['measurements' => function($query) {
                $query->latest('record_date');
            }])
            ->get();
            
        return Inertia::render('Mother/Measurements', [
            'children' => $children
        ]);
    }

    public function familyPlanning()
    {
        $records = \Illuminate\Support\Facades\DB::table('family_planning')
            ->where('mother_user_id', auth()->id())
            ->get();
            
        return Inertia::render('Mother/FamilyPlanning', ['records' => $records]);
    }

    public function visits()
    {
        $appointments = \App\Models\Appointment::where('mother_user_id', auth()->id())
            ->with(['antenatalRecord', 'doctor'])
            ->orderBy('appointment_date', 'desc')
            ->get();
            
        return Inertia::render('Mother/Visits', ['appointments' => $appointments]);
    }
    
    public function guides() { return Inertia::render('Mother/Guides'); }
    
    public function safetyTips() { return Inertia::render('Mother/SafetyTips'); }
}
