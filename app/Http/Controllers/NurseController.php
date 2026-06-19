<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class NurseController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Nurse/Dashboard', [
            'usersCount' => User::count(),
            'doctorsCount' => User::where('role', 'doctor')->where('IsActive', 1)->count(),
            'mothersCount' => User::where('role', 'mother')->where('IsActive', 1)->count(),
            'nursesCount' => User::where('role', 'nurse')->where('IsActive', 1)->count(),
        ]);
    }

    public function announcements()
    {
        $announcements = Announcement::latest()->paginate(10);
        return Inertia::render('Nurse/Announcements/Index', [
            'announcements' => $announcements
        ]);
    }

    public function createAnnouncement()
    {
        return Inertia::render('Nurse/Announcements/Create');
    }

    public function manageMothers(Request $request)
    {
        $users = User::where('role', 'mother')->paginate(10)->withQueryString();

        return Inertia::render('Nurse/ManageMothers', [
            'users' => $users
        ]);
    }

    public function storeMother(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'role' => 'mother',
        ]);

        return back()->with('success', 'Mother created successfully');
    }

    public function updateMother(Request $request, User $user)
    {
        if ($user->role !== 'mother') {
            return back()->with('error', 'You can only edit mothers.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only('name', 'email'));

        return back()->with('success', 'Mother updated successfully');
    }

    public function deleteMother(User $user)
    {
        if ($user->role !== 'mother') {
            return back()->with('error', 'You can only delete mothers.');
        }

        $user->IsActive = !$user->IsActive;
        $user->save();

        $status = $user->IsActive ? 'activated' : 'deactivated';
        return back()->with('success', "Mother {$status} successfully.");
    }




    public function storeAd(Request $request)
    {
        Log::info('storeAd reached', $request->all());
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);
        
        Log::info('storeAd validation passed');
        
        Announcement::create([
            'title' => $request->title,
            'content' => $request->content
        ]);
        
        return redirect()->route('nurse.announcements.index')->with('success', 'Announcement created successfully');
    }

    public function deleteAnnouncement(Announcement $announcement)
    {
        $announcement->delete();
        return back()->with('success', 'Announcement deleted successfully');
    }
}
