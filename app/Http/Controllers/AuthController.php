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
            $request->session()->regenerate();
            // put session username
            $request->session()->put('username', Auth::user()->name);
            // put session login true
            $request->session()->put('login', true);
            // put session role
            $request->session()->put('role', Auth::user()->role);
            $role = auth()->user()->role;
            $redirect = match ($role) {
                'admin' => url('admin/dashboard'),
                'karyawan' => url('karyawan/karyawan-only'),
                default => url('/dashboard')
            };

            if ($request->ajax()) {
                return response()->json(['success' => true, 'redirect' => $redirect]);
            }

            return redirect($redirect);
        }

        if ($request->ajax()) {
            return response()->json(['message' => 'Email atau password salah.'], 401);
        }

        return back()->withErrors(['email' => 'Email atau password salah.']);
    }


    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
