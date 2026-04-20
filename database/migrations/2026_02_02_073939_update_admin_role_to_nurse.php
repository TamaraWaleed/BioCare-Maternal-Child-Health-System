<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Modify the column to accept 'nurse'
        // Note: We keep 'admin' for now to allow the data to exist before we update it, 
        // and in case we want to support both or rollback easier.
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'doctor', 'mother', 'nurse') NOT NULL DEFAULT 'mother'");

        // 2. Update the data
        DB::statement("UPDATE users SET role = 'nurse' WHERE role = 'admin'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Revert data
        DB::statement("UPDATE users SET role = 'admin' WHERE role = 'nurse'");

        // 2. Revert column definition (remove 'nurse')
        // Warning: This will fail if there are still 'nurse' roles, but we just updated them above.
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'doctor', 'mother') NOT NULL DEFAULT 'mother'");
    }
};
