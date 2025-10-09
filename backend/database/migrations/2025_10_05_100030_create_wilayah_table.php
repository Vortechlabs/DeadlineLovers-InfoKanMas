<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wilayah', function (Blueprint $table) {
            $table->id();
            $table->string('kode_wilayah')->unique();
            $table->string('nama_wilayah');
            $table->enum('tingkat', ['dusun', 'desa', 'kecamatan', 'kabupaten', 'provinsi']);
            $table->foreignId('parent_id')->nullable()->constrained('wilayah')->onDelete('cascade');
            $table->text('polygon')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wilayah');
    }
};