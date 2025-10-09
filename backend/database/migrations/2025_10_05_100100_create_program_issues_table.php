<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->foreignId('progress_id')->nullable()->constrained('program_progress');
            $table->string('judul_issue');
            $table->text('deskripsi_issue');
            $table->enum('tingkat_keparahan', ['rendah', 'sedang', 'tinggi', 'kritis']);
            $table->enum('status', ['terbuka', 'dalam_penanganan', 'selesai', 'ditutup'])->default('terbuka');
            $table->foreignId('dilaporkan_oleh')->constrained('users');
            $table->foreignId('ditugaskan_ke')->nullable()->constrained('users');
            $table->date('tanggal_deadline')->nullable();
            $table->text('tindakan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_issues');
    }
};