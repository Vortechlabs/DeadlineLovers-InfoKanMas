<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Kosongkan atau register services yang sudah ada
        // $this->app->singleton('program.service', function () {
        //     return new \App\Services\ProgramService();
        // });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Default string length untuk MySQL
        Schema::defaultStringLength(191);

        // Response macros
        \Illuminate\Routing\ResponseFactory::macro('success', function ($data = null, $message = 'Success', $status = 200) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $data,
            ], $status);
        });

        \Illuminate\Routing\ResponseFactory::macro('error', function ($message = 'Error', $status = 400, $errors = null) {
            return response()->json([
                'success' => false,
                'message' => $message,
                'errors' => $errors,
            ], $status);
        });

        // Auto generate kode program
        \App\Models\ProgramModel::creating(function ($program) {
            if (empty($program->kode_program)) {
                $program->kode_program = 'PRG-' . date('YmdHis') . rand(100, 999);
            }
        });
    }
}