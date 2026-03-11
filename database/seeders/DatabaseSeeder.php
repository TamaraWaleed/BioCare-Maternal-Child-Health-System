<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    //Seed the application's database
    public function run(): void
    {
        //Admin (Nurse)
        \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => 'password',
            'role' => 'nurse',
        ]);

        //Doctor
        $doctor = \App\Models\User::create([
            'name' => 'Dr. Smith',
            'email' => 'doctor@test.com',
            'password' => 'password',
            'role' => 'doctor',
        ]);
        \App\Models\DoctorProfile::create([
            'user_id' => $doctor->id,
            'specialty' => 'Pediatrics',
            'phone' => '1234567890',
            'city' => 'New York',
        ]);

        //Mother
        $mother = \App\Models\User::create([
            'name' => 'Jane Doe',
            'email' => 'mother@test.com',
            'password' => 'password',
            'role' => 'mother',
        ]);
        \App\Models\MotherProfile::create([
            'user_id' => $mother->id,
            'birth_date' => '1990-01-01',
            'phone' => '0987654321',
            'city' => 'Los Angeles',
        ]);
    }
}
