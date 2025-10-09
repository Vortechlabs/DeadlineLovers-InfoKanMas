<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kategori_program', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kategori');
            $table->string('deskripsi')->nullable();
            $table->string('icon')->nullable();
            $table->string('warna')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kategori_program');
    }
};