<?php

namespace App\Http\Controllers;

use App\Models\FamilyPlanning;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilyPlanningController extends Controller
{
    public function index()
    {
        $records = FamilyPlanning::with('mother')->paginate(10);
        return Inertia::render('Nurse/FamilyPlanning/Index', [
            'records' => $records
        ]);
    }

    public function create()
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/FamilyPlanning/Create', [
            'mothers' => $mothers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
        ]);

        FamilyPlanning::create($request->all());

        return redirect()->route('nurse.family-planning.index')->with('success', 'Family planning record saved.');
    }
}
