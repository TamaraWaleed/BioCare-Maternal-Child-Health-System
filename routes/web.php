<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('nurse')->middleware(['auth', 'role:nurse'])->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\NurseController::class, 'dashboard'])->name('nurse.dashboard');
        
        //User Management
        Route::get('/users', [\App\Http\Controllers\NurseController::class, 'manageUsers'])->name('nurse.users.index');
        Route::post('/users', [\App\Http\Controllers\NurseController::class, 'storeUser'])->name('nurse.users.store');
        Route::put('/users/{user}', [\App\Http\Controllers\NurseController::class, 'updateUser'])->name('nurse.users.update');
        Route::delete('/users/{user}', [\App\Http\Controllers\NurseController::class, 'deleteUser'])->name('nurse.users.delete');

        //Announcements (Ads)
        Route::get('/announcements', [\App\Http\Controllers\NurseController::class, 'announcements'])->name('nurse.announcements.index');
        Route::get('/announcements/create', [\App\Http\Controllers\NurseController::class, 'createAnnouncement'])->name('nurse.announcements.create');
        Route::post('/announcements', [\App\Http\Controllers\NurseController::class, 'storeAd'])->name('nurse.announcements.store');
        Route::delete('/announcements/{announcement}', [\App\Http\Controllers\NurseController::class, 'deleteAnnouncement'])->name('nurse.announcements.delete');

    });

    
    Route::middleware('role:doctor')->group(function () {
        Route::get('/doctor/dashboard', [\App\Http\Controllers\DoctorController::class, 'dashboard'])->name('doctor.dashboard');
        Route::get('/doctor/search', [\App\Http\Controllers\DoctorController::class, 'search'])->name('doctor.search');
        Route::get('/doctor/patients/{user}', [\App\Http\Controllers\DoctorController::class, 'show'])->name('doctor.patients.show');
    });

    Route::middleware('role:mother')->group(function () {
        Route::get('/mother/dashboard', [\App\Http\Controllers\MotherController::class, 'dashboard'])->name('mother.dashboard');
    });

    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
