<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;

if (Schema::hasTable('cache')) {
    echo "CACHE: EXISTS\n";
} else {
    echo "CACHE: MISSING\n";
}
if (Schema::hasTable('users')) {
    echo "USERS: EXISTS\n";
} else {
    echo "USERS: MISSING\n";
}
if (Schema::hasTable('sessions')) {
    echo "SESSIONS: EXISTS\n";
} else {
    echo "SESSIONS: MISSING\n";
}
if (Schema::hasTable('jobs')) {
    echo "JOBS: EXISTS\n";
} else {
    echo "JOBS: MISSING\n";
}
