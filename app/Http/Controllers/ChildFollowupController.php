<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\ChildFollowup;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CanNotifyUsers;

class ChildFollowupController extends Controller
{
    use CanNotifyUsers;
    public function index()
    {
        $records = ChildFollowup::with(['child.mother', 'doctor'])->paginate(10);
        return Inertia::render('Nurse/ChildFollowup/Index', [
            'records' => $records
        ]);
    }

    public function create()
    {
        $children = Child::all();
        $doctors = User::where('role', 'doctor')->get();
        return Inertia::render('Nurse/ChildFollowup/Create', [
            'children' => $children,
            'doctors' => $doctors
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'child_id' => 'required|exists:children,id',
            'date' => 'required|date',
            'doctor_user_id' => 'nullable|exists:users,id',
        ]);

        $record = ChildFollowup::create($request->all());
        $record->load('child');

        // Notify Doctor
        if ($record->doctor_user_id) {
            $this->notifyUser(
                $record->doctor_user_id,
                "A child follow-up referral for " . $record->child->name . " has been assigned to you.",
                route('doctor.followup')
            );
        } else {
            $this->notifyRole(
                'doctor',
                "A new child follow-up referral for " . $record->child->name . " has been created.",
                route('doctor.followup')
            );
        }

        // Notify Mother
        $this->notifyUser(
            $record->child->mother_user_id,
            "A follow-up referral has been created for " . $record->child->name . " on " . $record->date,
            route('mother.dashboard') // Assuming mother sees general info on dashboard or specific page
        );

        return redirect()->route('nurse.child-followup.index')->with('success', 'Child follow-up record saved.');
    }
}
