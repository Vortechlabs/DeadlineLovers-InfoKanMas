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
public function register(Request $request){
    $validate = Validator::make($request->all(), [
        'nama' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'telepon' => 'required|string|max:15',
        'umur' => 'required|integer|min:1|max:120',
        'rt' => 'required|string|max:10',
        'rw' => 'required|string|max:10',
        'alamat_lengkap' => 'required|integer',
        'password' => 'required|string|min:8|confirmed',
    ]);

    if($validate->fails()){
        return response()->json([
            'success' => false,
            'error' => $validate->errors(),
        ], 422); // Changed from 403 to 422 for validation errors
    }

    $user = User::create([
        'nama' => $request->nama,
        'email' => $request->email,
        'telepon' => $request->telepon,
        'umur' => $request->umur,
        'rt' => $request->rt,
        'rw' => $request->rw,
        'alamat_lengkap' => $request->alamat_lengkap,
        'role' => 'user', 
        'password' => Hash::make($request->password),
        ]);

    return response()->json([
        'success' => true,
        'data' => [
            'user' => $user,
        ],
        'message' => 'User berhasil didaftarkan!',
    ], 201);

    if (!$user) {
    return response()->json([
        'success' => false,
        'message' => 'User tidak ditemukan.',
    ], 404);
    }

}

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(), // otomatis ambil user dari token Sanctum
        ], 200);
    }


    public function login(Request $request){
        $validate = Validator::make($request->all(), [
            'email'=>'required|string|email|max:255',
            'password'=>'required|string|min:8',
        ]);

        if($validate->fails()){
            return response()->json([
                'success'=> false,
                'error'=> $validate->errors(),
            ] ,403);
        }

        $user = User::where('email',$request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([  
            'success'=>true,
            'data'=> [
                'user'=>$user,
                'access_token'=>$token,
                'token_type'=>'Bearer'
            ],
            'message'=>'Anda berhasil login!',
        ], );
    }

    public function logout(Request $request){   
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success'=>true,
            'message'=> 'Logout Berhasil'
        ],200);
    }
}
