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
        
        // User Management
        Route::get('/users', [\App\Http\Controllers\NurseController::class, 'manageUsers'])->name('nurse.users.index');
        Route::post('/users', [\App\Http\Controllers\NurseController::class, 'storeUser'])->name('nurse.users.store');
        Route::put('/users/{user}', [\App\Http\Controllers\NurseController::class, 'updateUser'])->name('nurse.users.update');
        Route::delete('/users/{user}', [\App\Http\Controllers\NurseController::class, 'deleteUser'])->name('nurse.users.delete');

        // Announcements (Ads)
        Route::get('/announcements', [\App\Http\Controllers\NurseController::class, 'announcements'])->name('nurse.announcements.index');
        Route::get('/announcements/create', [\App\Http\Controllers\NurseController::class, 'createAnnouncement'])->name('nurse.announcements.create');
        Route::post('/announcements', [\App\Http\Controllers\NurseController::class, 'storeAd'])->name('nurse.announcements.store');
        Route::delete('/announcements/{announcement}', [\App\Http\Controllers\NurseController::class, 'deleteAnnouncement'])->name('nurse.announcements.delete');

        // Children Management
        Route::get('/children', [\App\Http\Controllers\ChildController::class, 'index'])->name('nurse.children.index');
        Route::get('/children/create', [\App\Http\Controllers\ChildController::class, 'create'])->name('nurse.children.create');
        Route::post('/children', [\App\Http\Controllers\ChildController::class, 'store'])->name('nurse.children.store');
        Route::get('/children/{child}/edit', [\App\Http\Controllers\ChildController::class, 'edit'])->name('nurse.children.edit');
        Route::put('/children/{child}', [\App\Http\Controllers\ChildController::class, 'update'])->name('nurse.children.update');
        Route::delete('/children/{child}', [\App\Http\Controllers\ChildController::class, 'destroy'])->name('nurse.children.delete');

        // Child Follow-up & Referred
        Route::get('/child-followup', [\App\Http\Controllers\ChildFollowupController::class, 'index'])->name('nurse.child-followup.index');
        Route::get('/child-followup/create', [\App\Http\Controllers\ChildFollowupController::class, 'create'])->name('nurse.child-followup.create');
        Route::post('/child-followup', [\App\Http\Controllers\ChildFollowupController::class, 'store'])->name('nurse.child-followup.store');

        // Family Planning
        Route::get('/family-planning', [\App\Http\Controllers\FamilyPlanningController::class, 'index'])->name('nurse.family-planning.index');
        Route::get('/family-planning/create', [\App\Http\Controllers\FamilyPlanningController::class, 'create'])->name('nurse.family-planning.create');
        Route::post('/family-planning', [\App\Http\Controllers\FamilyPlanningController::class, 'store'])->name('nurse.family-planning.store');


        // Medical Records
        Route::get('/medical-records', [\App\Http\Controllers\NurseMedicalController::class, 'index'])->name('nurse.medical.index');
        
        // Newborn Assessment Routes
        Route::get('/medical-records/newborn', [\App\Http\Controllers\NurseMedicalController::class, 'createNewbornAssessment'])->name('nurse.medical.newborn.create');
        Route::post('/medical-records/newborn', [\App\Http\Controllers\NurseMedicalController::class, 'storeNewbornAssessment'])->name('nurse.medical.newborn.store');
        
        // Antenatal Routes
        Route::get('/medical-records/antenatal', [\App\Http\Controllers\NurseMedicalController::class, 'createAntenatal'])->name('nurse.medical.antenatal.create');
        Route::post('/medical-records/antenatal', [\App\Http\Controllers\NurseMedicalController::class, 'storeAntenatal'])->name('nurse.medical.antenatal.store');
        
        // Postnatal Routes
        Route::get('/medical-records/postnatal', [\App\Http\Controllers\NurseMedicalController::class, 'createPostnatal'])->name('nurse.medical.postnatal.create');
        Route::post('/medical-records/postnatal', [\App\Http\Controllers\NurseMedicalController::class, 'storePostnatal'])->name('nurse.medical.postnatal.store');

        // Previous Pregnancy Routes
        Route::get('/medical-records/pregnancy', [\App\Http\Controllers\NurseMedicalController::class, 'createPreviousPregnancy'])->name('nurse.medical.pregnancy.create');
        Route::post('/medical-records/pregnancy', [\App\Http\Controllers\NurseMedicalController::class, 'storePreviousPregnancy'])->name('nurse.medical.pregnancy.store');

        // Obstetrical Risks Routes
        Route::get('/medical-records/obstetrical-risks', [\App\Http\Controllers\NurseMedicalController::class, 'createObstetricalRisks'])->name('nurse.medical.obstetrical.create');
        Route::post('/medical-records/obstetrical-risks', [\App\Http\Controllers\NurseMedicalController::class, 'storeObstetricalRisks'])->name('nurse.medical.obstetrical.store');

        // Current Risks Routes
        Route::get('/medical-records/current-risks', [\App\Http\Controllers\NurseMedicalController::class, 'createCurrentRisks'])->name('nurse.medical.current-risks.create');
        Route::post('/medical-records/current-risks', [\App\Http\Controllers\NurseMedicalController::class, 'storeCurrentRisks'])->name('nurse.medical.current-risks.store');
        
        // USS Routes
        Route::get('/medical-records/uss', [\App\Http\Controllers\NurseMedicalController::class, 'createUSS'])->name('nurse.medical.uss.create');
        Route::post('/medical-records/uss', [\App\Http\Controllers\NurseMedicalController::class, 'storeUSS'])->name('nurse.medical.uss.store');

        // Vaccination Routes
        Route::get('/medical-records/vaccination', [\App\Http\Controllers\NurseMedicalController::class, 'createVaccination'])->name('nurse.medical.vaccination.create');
        Route::post('/medical-records/vaccination', [\App\Http\Controllers\NurseMedicalController::class, 'storeVaccination'])->name('nurse.medical.vaccination.store');

        // Preventive Routes
        Route::get('/medical-records/preventive', [\App\Http\Controllers\NurseMedicalController::class, 'createPreventive'])->name('nurse.medical.preventive.create');
        Route::post('/medical-records/preventive', [\App\Http\Controllers\NurseMedicalController::class, 'storePreventive'])->name('nurse.medical.preventive.store');

        // Schedule Routes
        Route::get('/schedule', [\App\Http\Controllers\NurseMedicalController::class, 'schedule'])->name('nurse.schedule');
        Route::post('/appointments', [\App\Http\Controllers\NurseMedicalController::class, 'storeAppointment'])->name('nurse.appointments.store');
        Route::patch('/appointments/{appointment}', [\App\Http\Controllers\NurseMedicalController::class, 'updateAppointment'])->name('nurse.appointments.update');
        Route::delete('/appointments/{appointment}', [\App\Http\Controllers\NurseMedicalController::class, 'deleteAppointment'])->name('nurse.appointments.delete');
    });

    Route::middleware(['auth', 'role:mother'])->group(function () {
        Route::get('/chatbot', [\App\Http\Controllers\ChatController::class, 'index'])->name('chatbot.index');
        Route::post('/chatbot/ask', [\App\Http\Controllers\ChatController::class, 'askAi'])->name('chatbot.ask');
    });

    Route::middleware('auth')->group(function () {
        Route::get('/chatbot/unread-count', [\App\Http\Controllers\ChatController::class, 'unreadCount'])->name('chatbot.unread-count');
        Route::get('/chatbot/recent-notifications', [\App\Http\Controllers\ChatController::class, 'recentNotifications'])->name('chatbot.recent-notifications');
        Route::post('/chatbot/mark-as-read/{message}', [\App\Http\Controllers\ChatController::class, 'markAsRead'])->name('chatbot.mark-as-read');
    });

    Route::middleware('role:doctor')->group(function () {
        Route::get('/doctor/dashboard', [\App\Http\Controllers\DoctorController::class, 'dashboard'])->name('doctor.dashboard');
        
        Route::get('/doctor/antenatal', [\App\Http\Controllers\DoctorController::class, 'antenatal'])->name('doctor.antenatal');
        Route::post('/doctor/antenatal', [\App\Http\Controllers\DoctorController::class, 'storeAntenatal'])->name('doctor.antenatal.store');

        Route::get('/doctor/child-examination', [\App\Http\Controllers\DoctorController::class, 'childExamination'])->name('doctor.child_examination');
        Route::post('/doctor/child-examination', [\App\Http\Controllers\DoctorController::class, 'storeChildExamination'])->name('doctor.child_examination.store');

        Route::get('/doctor/measurements', [\App\Http\Controllers\DoctorController::class, 'measurements'])->name('doctor.measurements');
        Route::get('/doctor/followup', [\App\Http\Controllers\DoctorController::class, 'followup'])->name('doctor.followup');
        Route::get('/doctor/schedule', [\App\Http\Controllers\DoctorController::class, 'schedule'])->name('doctor.schedule');
        Route::get('/doctor/search', [\App\Http\Controllers\DoctorController::class, 'search'])->name('doctor.search');
        Route::get('/doctor/patients/{user}', [\App\Http\Controllers\DoctorController::class, 'show'])->name('doctor.patients.show');
        Route::delete('/doctor/appointments/{appointment}', [\App\Http\Controllers\DoctorController::class, 'deleteAppointment'])->name('doctor.appointments.delete');
        Route::patch('/doctor/appointments/{appointment}', [\App\Http\Controllers\DoctorController::class, 'updateAppointment'])->name('doctor.appointments.update');
        Route::post('/doctor/appointments', [\App\Http\Controllers\DoctorController::class, 'storeAppointment'])->name('doctor.appointments.store');
    });

    Route::middleware('role:mother')->group(function () {
        Route::get('/mother/dashboard', [\App\Http\Controllers\MotherController::class, 'dashboard'])->name('mother.dashboard');
        Route::get('/mother/previous-pregnancies', [\App\Http\Controllers\MotherController::class, 'previousPregnancies'])->name('mother.previous_pregnancies');
        Route::get('/mother/risks', [\App\Http\Controllers\MotherController::class, 'risks'])->name('mother.risks');
        Route::get('/mother/uss', [\App\Http\Controllers\MotherController::class, 'uss'])->name('mother.uss');
        Route::get('/mother/antenatal', [\App\Http\Controllers\MotherController::class, 'antenatal'])->name('mother.antenatal');
        Route::get('/mother/postnatal', [\App\Http\Controllers\MotherController::class, 'postnatal'])->name('mother.postnatal');
        Route::get('/mother/vaccinations', [\App\Http\Controllers\MotherController::class, 'vaccinations'])->name('mother.vaccinations');
        Route::get('/mother/measurements', [\App\Http\Controllers\MotherController::class, 'measurements'])->name('mother.measurements');
        Route::get('/mother/measurements', [\App\Http\Controllers\MotherController::class, 'measurements'])->name('mother.measurements');
        Route::get('/mother/family-planning', [\App\Http\Controllers\MotherController::class, 'familyPlanning'])->name('mother.family_planning');
        Route::get('/mother/visits', [\App\Http\Controllers\MotherController::class, 'visits'])->name('mother.visits');
        Route::get('/mother/guides', [\App\Http\Controllers\MotherController::class, 'guides'])->name('mother.guides');
        Route::get('/mother/safety-tips', [\App\Http\Controllers\MotherController::class, 'safetyTips'])->name('mother.safety_tips');
    });

    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
