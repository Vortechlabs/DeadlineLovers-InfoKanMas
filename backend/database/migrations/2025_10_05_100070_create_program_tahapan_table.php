<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_tahapan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->string('nama_tahapan');
            $table->text('deskripsi')->nullable();
            $table->integer('persentase');
            $table->date('tanggal_mulai_rencana');
            $table->date('tanggal_selesai_rencana');
            $table->date('tanggal_mulai_aktual')->nullable();
            $table->date('tanggal_selesai_aktual')->nullable();
            $table->enum('status', ['menunggu', 'dalam_pengerjaan', 'selesai', 'tertunda'])->default('menunggu');
            $table->integer('urutan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_tahapan');
    }
};