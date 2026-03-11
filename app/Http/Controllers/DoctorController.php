<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{
    public function dashboard()
    {
        $mothers = \App\Models\User::where('role', 'mother')
            ->with(['motherProfile', 'children'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Doctor/Dashboard', [
            'mothers' => $mothers
        ]);
    }
    //Search for a mother
    public function search(Request $request)
    {
        $query = $request->input('q');
        $results = [];

        if ($query) {
            $results = \App\Models\User::where('role', 'mother')
                ->where(function($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('email', 'like', "%{$query}%");
                })
                ->with(['motherProfile', 'children'])
                ->get();
        }
        //show the search results
        return Inertia::render('Doctor/Search', [
            'query' => $query,
            'results' => $results
        ]);
    }
    //Show a mother's profile
    public function show(\App\Models\User $user)
    {
        if ($user->role !== 'mother') {
            return redirect()->route('doctor.dashboard')->with('error', 'Invalid patient.');
        }

        $user->load(['motherProfile', 'children']);

        return Inertia::render('Doctor/Show', [
            'mother' => $user
        ]);
    }
}
