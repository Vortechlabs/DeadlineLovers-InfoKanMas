<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminDesaMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
         /** @var User|null $user */
        $user = Auth::user();

        if($user && $user->isAdminDesa()){
            return $next($request);
        }

        return response()->json([
            'message'=>'Unauthorized. Admin access required.'
        ], 403);

    }
}
