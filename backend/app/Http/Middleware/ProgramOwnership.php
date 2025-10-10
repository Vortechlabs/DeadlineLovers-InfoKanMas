<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\ProgramModel;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProgramOwnership
{
    public function handle(Request $request, Closure $next): Response
    {
        $programId = $request->route('id') ?? $request->route('program');
        $program = ProgramModel::find($programId);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.',
                'data' => null
            ], 404);
        }

        $user = Auth::user();

        // Admin Dinas & Kabupaten bisa akses semua program
        if (in_array($user->role, ['admin_dinas', 'admin_kabupaten'])) {
            return $next($request);
        }

        // Admin Kecamatan hanya bisa akses program di kecamatannya
        if ($user->role === 'admin_kecamatan') {
            if ($program->wilayah->parent_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di kecamatan Anda.',
                    'data' => null
                ], 403);
            }
        }

        // Admin Desa hanya bisa akses program di desanya
        if ($user->role === 'admin_desa') {
            if ($program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di desa Anda.',
                    'data' => null
                ], 403);
            }
        }

        // User biasa hanya bisa melihat (read-only)
        if ($user->role === 'user' && !$request->isMethod('get')) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. User hanya dapat melihat program.',
                'data' => null
            ], 403);
        }

        return $next($request);
    }
}