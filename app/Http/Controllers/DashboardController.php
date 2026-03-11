<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    //Show the dashboard
    public function index()
    {
        //Check the user role
        $user = Auth::user();
        
        if ($user->role === 'nurse') {
            return redirect()->route('nurse.dashboard');
        } elseif ($user->role === 'doctor') {
            return redirect()->route('doctor.dashboard');
        } else {
            return redirect()->route('mother.dashboard');
        }
    }
}
