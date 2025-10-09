<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CanApproveProgram
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if (!$user->canApprovePrograms()) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Anda tidak memiliki wewenang untuk menyetujui program.',
                'data' => null
            ], 403);
        }

        return $next($request);
    }
}