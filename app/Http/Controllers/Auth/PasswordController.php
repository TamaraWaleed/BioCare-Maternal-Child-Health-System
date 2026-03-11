<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    //Update the user's password
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        if ($request->user()->password !== $validated['current_password']) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'current_password' => 'The provided password does not match your current password.',
            ]);
        }

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return back();
    }
}
