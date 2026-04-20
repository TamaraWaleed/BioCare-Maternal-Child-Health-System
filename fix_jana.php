<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$u = User::where('email', 'Jana@gmail.com')->first();
if ($u) {
    $u->password = 'jana123'; // The 'hashed' cast in User.php will handle the hashing
    $u->save();
    echo "Password updated and hashed for Jana@gmail.com (ID: {$u->id})\n";
    echo "New Hash: {$u->password}\n";
} else {
    echo "User NOT found.\n";
}
