<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program', function (Blueprint $table) {
            $table->id();
            $table->string('kode_program')->unique();
            $table->string('nama_program');
            $table->text('deskripsi');
            $table->foreignId('kategori_program_id')->constrained('kategori_program');
            $table->enum('jenis_program', ['desa', 'kecamatan', 'dinas', 'kabupaten']);
            $table->enum('tingkat_pengusul', ['desa', 'kecamatan', 'dinas', 'kabupaten']);
            $table->foreignId('wilayah_id')->nullable()->constrained('wilayah');
            $table->integer('tahun_anggaran');
            $table->enum('status_program', ['draft', 'diajukan', 'diverifikasi_kecamatan', 'approved', 'rejected', 'berjalan', 'selesai', 'ditunda'])->default('draft');
            $table->enum('prioritas', ['rendah', 'sedang', 'tinggi', 'darurat'])->default('sedang');
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->integer('target_penerima_manfaat')->nullable();
            $table->decimal('anggaran_total', 15, 2)->default(0);
            $table->decimal('realisasi_anggaran', 15, 2)->default(0);
            $table->foreignId('penanggung_jawab_id')->constrained('users');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('verified_by')->nullable()->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->dateTime('tanggal_verifikasi')->nullable();
            $table->dateTime('tanggal_approval')->nullable();
            $table->text('catatan_verifikasi')->nullable();
            $table->text('catatan_approval')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program');
    }
};