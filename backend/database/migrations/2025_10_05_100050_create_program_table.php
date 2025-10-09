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
        Schema::create('program', function (Blueprint $table) {
        $table->id();
        $table->string('nama_program');
        $table->text('deskripsi');
        $table->enum('jenis_program', ['desa', 'kecamatan', 'dinas', 'kabupaten']);
        $table->enum('tingkat_pengusul', ['desa', 'kecamatan', 'dinas', 'kabupaten']);
        $table->foreignId('alamat')->nullable()->constrained('wilayah')->onDelete('cascade');
        $table->integer('tahun_anggaran');
        $table->enum('status_program', ['draft', 'diajukan', 'diverifikasi_kecamatan', 'approved', 'rejected', 'berjalan', 'selesai'])->default('draft');
        $table->date('tanggal_mulai');
        $table->date('tanggal_selesai');
        $table->integer('target_penerima_manfaat')->nullable();
        $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
        $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('cascade');
        $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('cascade');
        $table->dateTime('tanggal_verifikasi')->nullable();
        $table->dateTime('tanggal_approval')->nullable();
        $table->text('catatan_verifikasi')->nullable();
        $table->text('catatan_approval')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposal');
    }
};
