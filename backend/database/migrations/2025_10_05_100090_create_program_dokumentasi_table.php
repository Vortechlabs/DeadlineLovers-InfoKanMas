<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_dokumentasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('progress_id')->constrained('program_progress')->onDelete('cascade');
            $table->enum('jenis', ['foto', 'video', 'dokumen']);
            $table->string('file_path');
            $table->string('file_name');
            $table->string('mime_type');
            $table->decimal('file_size')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->timestamp('waktu_pengambilan')->nullable();
            $table->json('metadata_ai')->nullable();
            $table->boolean('is_verified_ai')->default(false);
            $table->text('keterangan')->nullable();
            $table->enum('resiko_kecurangan',['low', 'standard', 'high'])->nullable();
            $table->decimal('presentase_kecurangan')->nullable();
            $table->text('skor_ai')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_dokumentasi');
    }
};