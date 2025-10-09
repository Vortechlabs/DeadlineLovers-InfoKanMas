<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * 🔐 LOGIN — Authentikasi user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // Cek credentials
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password salah'
            ], 401);
        }

        // Dapatkan user yang sudah terautentikasi
        $user = Auth::user();
        
        // Pastikan user ada dan bisa membuat token
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        // Buat token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]
        ], 200);
    }

    /**
     * 📝 REGISTER — Pendaftaran user baru
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'telepon' => 'required|string|max:15',
            'umur' => 'required|integer|min:17|max:100',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'alamat_lengkap' => 'required|exists:wilayah,id',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'sometimes|in:user,admin_desa,admin_kecamatan,admin_kabupaten,admin_dinas',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                'nama' => $request->nama,
                'email' => $request->email,
                'telepon' => $request->telepon,
                'umur' => $request->umur,
                'rt' => $request->rt,
                'rw' => $request->rw,
                'alamat_lengkap' => $request->alamat_lengkap,
                'role' => $request->role ?? 'user',
                'password' => Hash::make($request->password),
                'email_verified_at' => now(), // Auto verify untuk demo
            ]);

            // Buat token untuk user baru
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registrasi berhasil',
                'data' => [
                    'user' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registrasi gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🚪 LOGOUT — Logout user
     */
    public function logout(Request $request)
    {
        try {
            // Hapus token current user
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logout berhasil'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 👤 ME — Get current user data
     */
    public function me(Request $request)
    {
        $user = $request->user()->load('alamat');

        return response()->json([
            'success' => true,
            'message' => 'Data user berhasil diambil',
            'data' => $user
        ], 200);
    }
}