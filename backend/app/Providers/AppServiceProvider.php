<?php

namespace App\Providers;

use App\Services\AiFraudDetectionService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(AiFraudDetectionService::class, function ($app) {
            return new AiFraudDetectionService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // $router = $this->app['router'];
        // $router->aliasMiddleware('admin.desa', \App\Http\Middleware\AdminDesaMiddleware::class);
        // $router->aliasMiddleware('admin.kecamatan', \App\Http\Middleware\AdminKecamatanMiddleware::class);
        // $router->aliasMiddleware('admin.kabupaten', \App\Http\Middleware\AdminKabupatenMiddleware::class);
        // $router->aliasMiddleware('admin.dinas', \App\Http\Middleware\AdminDinasMiddleware::class);
        // $router->aliasMiddleware('program.ownership', \App\Http\Middleware\ProgramOwnership::class);
    }
}
