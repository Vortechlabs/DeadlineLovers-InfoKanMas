<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->foreignId('tahapan_id')->constrained('program_tahapan');
            $table->integer('persentase');
            $table->text('deskripsi_progress');
            $table->decimal('anggaran_terpakai', 15, 2)->default(0);
            $table->foreignId('dilaporkan_oleh')->constrained('users');
            $table->enum('status_verifikasi', ['menunggu', 'diverifikasi', 'ditolak', 'revisi'])->default('menunggu');
            $table->foreignId('divalidasi_oleh')->nullable()->constrained('users');
            $table->text('catatan_validasi')->nullable();
            $table->dateTime('tanggal_validasi')->nullable();
            $table->json('metadata_ai')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_progress');
    }
};