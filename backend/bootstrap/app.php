<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // ✅ PASTIKAN sanctum middleware ada di sini
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'admin.desa' => \App\Http\Middleware\AdminDesaMiddleware::class,
            'admin.dinas' => \App\Http\Middleware\AdminDinasMiddleware::class,
            'admin.kabupaten' => \App\Http\Middleware\AdminKabupatenMiddleware::class,
            'admin.kecamatan' => \App\Http\Middleware\AdminKecamatanMiddleware::class,
            'can.verify' => \App\Http\Middleware\CanVerifyProgram::class,
            'can.approve' => \App\Http\Middleware\CanApproveProgram::class,
            'program.ownership' => \App\Http\Middleware\ProgramOwnership::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();