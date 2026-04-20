<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChildController extends Controller
{
    public function index()
    {
        $children = Child::with('mother')->paginate(10);
        return Inertia::render('Nurse/Children/Index', [
            'children' => $children
        ]);
    }

    public function create()
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/Children/Create', [
            'mothers' => $mothers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'sex' => 'required|in:male,female',
            'birth_date' => 'required|date',
            'birth_weight' => 'nullable|numeric',
        ]);

        Child::create($request->all());

        return redirect()->route('nurse.children.index')->with('success', 'Child created successfully.');
    }

    public function edit(Child $child)
    {
        $mothers = User::where('role', 'mother')->get();
        return Inertia::render('Nurse/Children/Edit', [
            'child' => $child,
            'mothers' => $mothers
        ]);
    }

    public function update(Request $request, Child $child)
    {
        $request->validate([
            'mother_user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'sex' => 'required|in:male,female',
            'birth_date' => 'required|date',
            'birth_weight' => 'nullable|numeric',
        ]);

        $child->update($request->all());

        return redirect()->route('nurse.children.index')->with('success', 'Child updated successfully.');
    }

    public function destroy(Child $child)
    {
        $child->delete();
        return redirect()->route('nurse.children.index')->with('success', 'Child deleted successfully.');
    }
}
