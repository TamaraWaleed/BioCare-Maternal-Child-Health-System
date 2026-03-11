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
            'doctorsCount' => User::where('role', 'doctor')->count(),
            'mothersCount' => User::where('role', 'mother')->count(),
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


    public function manageUsers(Request $request)
    {
        $query = User::query();

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Nurse/ManageUsers', [
            'users' => $users,
            'filters' => $request->only('role')
        ]);
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:nurse,doctor,mother',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role,
        ]);

        return back()->with('success', 'User created successfully');
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:nurse,doctor,mother',
        ]);

        $user->update($request->only('name', 'email', 'role'));

        return back()->with('success', 'User updated successfully');
    }

    public function deleteUser(User $user)
    {
        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();
        return back()->with('success', 'User deleted successfully');
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
