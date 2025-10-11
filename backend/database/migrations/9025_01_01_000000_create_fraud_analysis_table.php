<?php
// database/migrations/2024_01_01_000001_create_fraud_analysis_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fraud_analysis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->foreignId('dokumen_id')->nullable()->constrained('program_dokumen')->onDelete('cascade');
            $table->enum('jenis_analisis', [
                'fraud_detection', 
                'consistency_check', 
                'risk_analysis', 
                'rab_anomaly', 
                'comprehensive'
            ]);
            $table->enum('jenis_dokumen', ['proposal', 'rab', 'spk', 'kontrak', 'laporan', 'multiple']);
            $table->json('hasil_analisis')->nullable();
            $table->decimal('skor_risiko', 5, 2)->default(0);
            $table->enum('level_risiko', ['low', 'medium', 'high', 'critical'])->default('low');
            $table->json('rekomendasi')->nullable();
            $table->boolean('flag_meragukan')->default(false);
            $table->json('item_mencurigakan')->nullable();
            $table->enum('status', ['processing', 'completed', 'failed'])->default('processing');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['program_id', 'level_risiko']);
            $table->index(['flag_meragukan', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fraud_analysis');
    }
};