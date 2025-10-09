<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('program', function (Blueprint $table) {
            // Ubah kolom kode_program untuk allow null sementara
            $table->string('kode_program')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('program', function (Blueprint $table) {
            $table->string('kode_program')->nullable(false)->change();
        });
    }
};