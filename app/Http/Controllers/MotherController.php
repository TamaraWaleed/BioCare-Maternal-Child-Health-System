<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MotherController extends Controller
{
    public function dashboard()
    {
        $user = \Illuminate\Support\Facades\Auth::user();
        $user->load(['children', 'motherProfile']);

        $announcements = \App\Models\Announcement::latest()->take(3)->get();
        
        return Inertia::render('Mother/Dashboard', [
            'mother' => $user,
            'announcements' => $announcements,
        ]);
    }
}
