<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$count = DB::table('users')->count();
echo "USERS COUNT: " . $count . "\n";
if ($count > 0) {
    $users = DB::table('users')->limit(5)->get();
    foreach ($users as $user) {
        echo "- {$user->email} ({$user->name})\n";
    }
}
