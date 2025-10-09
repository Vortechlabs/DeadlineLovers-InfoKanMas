<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminDinasMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if ($user->role !== 'admin_dinas') {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Hanya Admin Dinas yang dapat mengakses.',
                'data' => null
            ], 403);
        }

        return $next($request);
    }
}