<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

       public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            session([
                'user_id' => $user->id,
                'username' => $user->name,
                'login' => true,
                'user_role' => $user->role,
            ]);

            // Tentukan URL redirect
            switch ($user->role) {
                case 'admin_hrd':
                    $redirectUrl = url('admin/dashboard');
                    break;
                case 'admin_hrd_mitra_kmj':
                    $redirectUrl = url('admin/hrd/mitra/kmj');
                    break;
                case 'admin_hrd_mitra_fortuna':
                    $redirectUrl = url('admin/hrd/mitra/fortuna');
                    break;
                case 'admin_produksi':
                    $redirectUrl = url('supervisor/dashboard');
                    break;
                case 'staff_produksi':
                    $redirectUrl = url('foreman/dashboard');
                    break;
                default:
                    Auth::logout();
                    return response()->json(['message' => 'Role tidak dikenali.'], 403);
            }

            // Jika permintaan AJAX
            if ($request->ajax()) {
                return response()->json([
                    'message' => 'Login berhasil!',
                    'redirect' => $redirectUrl
                ]);
            }

            // Jika permintaan biasa
            return redirect($redirectUrl);
        }

        // Gagal login
        if ($request->ajax()) {
            return response()->json([
                'message' => 'Email atau password salah.'
            ], 401); // 401 = Unauthorized
        }

        return back()->with('error', 'Email atau password salah.');
    }




    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
