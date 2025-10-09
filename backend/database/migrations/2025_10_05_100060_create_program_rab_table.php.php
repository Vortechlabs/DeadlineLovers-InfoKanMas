<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_rab', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('program')->onDelete('cascade');
            $table->string('nama_item');
            $table->text('deskripsi')->nullable();
            $table->decimal('volume', 10, 2);
            $table->string('satuan');
            $table->decimal('harga_satuan', 15, 2);
            $table->decimal('total', 15, 2);
            $table->integer('urutan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_rab');
    }
};