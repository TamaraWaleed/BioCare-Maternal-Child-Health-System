<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

try {
    if (!Schema::hasTable('migrations')) {
        echo "Migrations table does not exist.\n";
    } else {
        $migrations = DB::table('migrations')->orderBy('batch', 'asc')->orderBy('migration', 'asc')->get();
        echo "Completed Migrations:\n";
        foreach ($migrations as $m) {
            echo "Batch {$m->batch}: {$m->migration}\n";
        }
    }
    
    echo "\nTables in database:\n";
    $tables = DB::select('SHOW TABLES');
    foreach ($tables as $table) {
        echo "- " . array_values((array)$table)[0] . "\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
