<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengaduan', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pengaduan')->unique();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->foreignId('pelapor')->constrained('users')->onDelete('cascade');
            $table->enum('kategori_pengaduan', ['kejanggalan_rab', 'pelaksanaan_program', 'penyaluran_bantuan', 'lainnya']);
            $table->string('judul_pengaduan');
            $table->text('deskripsi_pengaduan');
            $table->json('bukti_pendukung')->nullable();
            $table->foreignId('lokasi_kejadian')->constrained('wilayah')->onDelete('cascade');
            $table->date('tanggal_kejadian');
            $table->enum('status_pengaduan', ['pending','diterima', 'diproses', 'ditindaklanjuti', 'selesai', 'ditolak'])->default('pending');
            $table->enum('prioritas', ['rendah', 'sedang', 'tinggi'])->default('sedang');
            $table->foreignId('ditangani_oleh')->nullable()->constrained('users')->onDelete('cascade');
            $table->dateTime('tanggal_ditangani')->nullable();
            $table->text('hasil_tindak_lanjut')->nullable();
            $table->dateTime('tanggal_selesai')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_table');
    }
};
