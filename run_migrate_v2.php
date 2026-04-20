<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Artisan;

try {
    echo "Running migrate...\n";
    $exitCode = Artisan::call('migrate', ['--force' => true]);
    echo "Exit Code: " . $exitCode . "\n";
    echo "Output:\n" . Artisan::output() . "\n";
} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
    // Echo the specific SQL error if available
    if (isset($e->errorInfo)) {
        echo "SQL Error: " . json_encode($e->errorInfo) . "\n";
    }
}
