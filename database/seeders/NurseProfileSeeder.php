<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NurseProfileSeeder extends Seeder
{
    //Run the database seeds
    public function run(): void
    {
        $nurses = \App\Models\User::where('role', 'nurse')->get();

        foreach ($nurses as $nurse) {
            \App\Models\NurseProfile::updateOrCreate(
                ['user_id' => $nurse->id],
                [
                    'phone' => '0712345678',
                    'city' => 'Kampala',
                ]
            );
        }
    }
}
