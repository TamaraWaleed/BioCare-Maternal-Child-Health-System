<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    //Display the user's profile form
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'doctorProfile' => $request->user()->doctorProfile,
            'nurseProfile' => $request->user()->nurseProfile,
            'motherProfile' => $request->user()->motherProfile,
        ]);
    }

    //Update the user's profile information
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        $validated = $request->validated();
        unset($validated['password']);
        $user->fill($validated);

        if ($request->filled('password')) {
            $user->password = $request->password;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if (in_array($user->role, ['doctor', 'nurse', 'mother'])) {
            $profileRelation = match($user->role) {
                'doctor' => 'doctorProfile',
                'nurse' => 'nurseProfile',
                'mother' => 'motherProfile',
                default => null,
            };

            if ($profileRelation) {
                // Determine which fields to pick based on role
                $fields = ['phone', 'city'];
                if ($user->role === 'mother') {
                    $fields = array_merge($fields, [
                        'birth_date', 'blood_group', 'rh_factor', 
                        'husband_name', 'husband_id_number', 
                        'maternity_center', 'country', 'health_center_phone'
                    ]);
                }

                $profileData = $request->only($fields);
                
                // Handle photo upload if present
                if ($request->hasFile('photo')) {
                    $dir = $user->role . '_photos';
                    $path = $request->file('photo')->store($dir, 'public');
                    $profileData['photo_path'] = '/storage/' . $path;
                }

                // Update or create the profile
                $user->$profileRelation()->updateOrCreate(
                    ['user_id' => $user->id],
                    $profileData
                );
            }
        }

        return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
    }

    //Delete the user's account
    public function destroy(Request $request): RedirectResponse
    {
        return Redirect::route('profile.edit')->with('error', 'Account deletion is disabled. Please contact your administrator.');
    }
}
