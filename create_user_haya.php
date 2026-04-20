<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

try {
    $email = 'haya@gmail.com';
    $user = User::where('email', $email)->first();
    
    if (!$user) {
        $user = User::create([
            'name' => 'Haya',
            'email' => $email,
            'password' => Hash::make('password'),
            'role' => 'nurse', // Based on the migration that converted admin to nurse
        ]);
        echo "User created: {$email}\n";
        
        // Also create a nurse profile if it doesn't exist
        \App\Models\NurseProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'phone' => '0700000000',
                'city' => 'Kampala',
            ]
        );
        echo "Nurse profile created.\n";
    } else {
        echo "User already exists: {$email}\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
