<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'usersCount' => User::where('IsActive', 1)->count(),
            'doctorsCount' => User::where('role', 'doctor')->where('IsActive', 1)->count(),
            'mothersCount' => User::where('role', 'mother')->where('IsActive', 1)->count(),
            'nursesCount' => User::where('role', 'nurse')->where('IsActive', 1)->count(),
            'adminsCount' => User::where('role', 'admin')->where('IsActive', 1)->count(),
        ]);
    }

    public function manageUsers(Request $request)
    {
        $query = User::query();

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('IsActive', 1);
            } elseif ($request->status === 'inactive') {
                $query->where('IsActive', 0);
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/ManageUsers', [
            'users' => $users,
            'filters' => $request->only('role', 'status', 'search')
        ]);
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,nurse,doctor,mother',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'role' => $request->role,
        ]);

        return back()->with('success', 'User created successfully');
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,nurse,doctor,mother',
            'password' => 'nullable|string|min:8',
        ]);

        $user->fill($request->only('name', 'email', 'role'));

        if ($request->filled('password')) {
            $user->password = \Illuminate\Support\Facades\Hash::make($request->password);
        }

        $user->save();

        return back()->with('success', 'User updated successfully');
    }

    public function deleteUser(User $user)
    {
        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->IsActive = !$user->IsActive;
        $user->save();

        $status = $user->IsActive ? 'activated' : 'deactivated';
        return back()->with('success', "User {$status} successfully.");
    }

    public function mothersReport()
    {
        $mothers = User::where('role', 'mother')
            ->with(['motherProfile', 'children'])
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/MothersReport', [
            'mothers' => $mothers
        ]);
    }

    public function searchMother(Request $request)
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

        return Inertia::render('Admin/SearchMother', [
            'query' => $query,
            'results' => $results
        ]);
    }

    public function showMother(User $user)
    {
        if ($user->role !== 'mother') {
            return redirect()->route('admin.dashboard')->with('error', 'Invalid patient.');
        }

        $user->load(['motherProfile', 'children']);

        // Fetch medical data
        $previousPregnancies = DB::table('previous_pregnancies')->where('mother_user_id', $user->id)->latest()->get();
        $obstetricalRisks = DB::table('medical_obstetrical_risks')->where('mother_user_id', $user->id)->latest()->get();
        $currentRisks = DB::table('current_risks')->where('mother_user_id', $user->id)->latest()->get();
        $ussExaminations = DB::table('uss_examinations')->where('mother_user_id', $user->id)->latest()->get();
        $postnatalExaminations = DB::table('postnatal_examinations')->where('mother_user_id', $user->id)->latest()->get();
        
        $antenatalRecords = \App\Models\AntenatalRecord::whereHas('appointment', function($q) use ($user) {
            $q->where('mother_user_id', $user->id);
        })->with('appointment')->latest()->get();

        $childIds = $user->children->pluck('id')->toArray();
        $vaccinations = [];
        $preventiveExams = [];
        $newbornAssessments = [];

        if (!empty($childIds)) {
            $vaccinations = DB::table('school_vaccination_program')->whereIn('child_id', $childIds)->latest()->get();
            $preventiveExams = DB::table('child_preventive_examinations')->whereIn('child_id', $childIds)->latest()->get();
            $newbornAssessments = DB::table('newborn_assessments')->whereIn('child_id', $childIds)->latest()->get();
        }

        return Inertia::render('Admin/ShowMother', [
            'mother' => $user,
            'previousPregnancies' => $previousPregnancies,
            'obstetricalRisks' => $obstetricalRisks,
            'currentRisks' => $currentRisks,
            'ussExaminations' => $ussExaminations,
            'postnatalExaminations' => $postnatalExaminations,
            'antenatalRecords' => $antenatalRecords,
            'vaccinations' => $vaccinations,
            'preventiveExams' => $preventiveExams,
            'newbornAssessments' => $newbornAssessments,
        ]);
    }
}
