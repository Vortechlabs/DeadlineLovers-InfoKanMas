<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_dokumen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->enum('jenis_dokumen', ['proposal', 'rundown_tahapan', 'gambar_teknis', 'surat_permohonan', 'foto_lokasi', 'laporan', 'lainnya']);
            $table->string('nama_dokumen');
            $table->string('file_path');
            $table->string('file_name');
            $table->string('mime_type');
            $table->decimal('file_size')->nullable();
            $table->text('keterangan')->nullable();
            $table->string('status_verifikasi_ai')->default('pending');
            $table->json('tahapan_generated')->nullable();
            $table->text('catatan_ai')->nullable();
            $table->decimal('presentase_kecurangan', 5, 2)->nullable();
            $table->string('resiko_kecurangan')->nullable();
            $table->text('skor_ai')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_dokumen');
    }
};