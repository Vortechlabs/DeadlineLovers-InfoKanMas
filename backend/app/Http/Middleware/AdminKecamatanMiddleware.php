<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminKecamatanMIddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if (!in_array($user->role, ['admin_kecamatan', 'admin_kabupaten', 'admin_dinas'])) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Hanya Admin Kecamatan/Kabupaten/Dinas yang dapat mengakses.',
                'data' => null
            ], 403);
        }

        return $next($request);
    }
}