<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CanVerifyProgram
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if (!$user->canVerifyPrograms()){
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Anda tidak memiliki wewenang untuk memverifikasi program.',
                'data' => null
            ], 403);
        }

        return $next($request);
    }
}