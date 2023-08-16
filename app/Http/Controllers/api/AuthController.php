<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use App\Models\User;
use Twilio\Rest\Client;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = Hash::make($request->input('password'));
        $confirmpass = $request->input('confirmpass');

        if (User::where('name', $username)->exists()) {
            return response()->json(['error' => 'This username already exists please choose another one'], 422);
        }
        if (User::where('phone', $phone)->exists()) {
            return response()->json(['error' => 'This telephone number is already assigned to an account'], 422);
        }
        if (User::where('email', $email)->exists()) {
            return response()->json(['error' => 'This email is already assigned to an account'], 422);
        }

        $dataUser = [
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
            'password' => $password,
            'token' => Str::random(60),
        ];

        Session::put('user', $dataUser);

        return response()->json(['user' => $dataUser], 200);
    }

    public function verify_code(Request $request)
    {
        if (Session::has('user') && Session::has('code')) {
            $dataUser = Session::get('user');
            $code = Session::get('code');
            if ($code == $request->input('code')) {
                $user = new User();
                $user->name = $dataUser->username;
                $user->email = $dataUser->email;
                $user->phone = $dataUser->phone;
                $user->password = $dataUser->password;
                $user->phone_verified_at = Carbon::now();
                $user->save();

                Auth::login($user, true);
                $accessToken = $user->createToken('authToken')->plainTextToken;
                $user = $user->withAccessToken($accessToken);
                $cookie = Cookie::make('auth_token', $accessToken, 60);
                return response()->json(['cookie' => $cookie], 200);
            } else {
                return response()->json(['message' => 'Incorrect authentication code'], 401);
            }
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }


    public function recup_userData()
    {
        if (Session::has('user')) {
            $user = Session::get('user'); // Utilisez 'user' au lieu de 'users'
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['message' => 'User not Found'], 404);
        }
    }

    public function sendSMS()
    {
        if (Session::has('user')) {
            // Envoyer un code de vérification par SMS
            $user = Session::get('user');
            $twilio = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));
            $code = mt_rand(100000, 999999);
            Session::put('code', $code);
            $message = "Votre code de vérification est : $code";
            $message = $twilio->messages->create($user['phone'], ['from' => env('TWILIO_FROM'), 'body' => $message]);
            return response()->json(['message' => 'Code Send'], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404); // Correction ici
        }
    }
}
