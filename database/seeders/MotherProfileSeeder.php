<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MotherProfileSeeder extends Seeder
{
    //Run the database seeds
    public function run(): void
    {
        $mothers = \App\Models\User::where('role', 'mother')->get();

        foreach ($mothers as $mother) {
            \App\Models\MotherProfile::updateOrCreate(
                ['user_id' => $mother->id],
                [
                    'birth_date' => '1995-01-01',
                    'city' => 'Kampala',
                    'phone' => '0770000000',
                ]
            );
        }
    }
}
