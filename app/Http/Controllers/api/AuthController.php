<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Twilio\Rest\Client;

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
        ];
        Session::put('dataUser', $dataUser);

        // // Envoyer un code de vérification par SMS
        // $twilio = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));
        // $code = mt_rand(100000, 999999);
        // $message = "Votre code de vérification est : $code";
        // $message = $twilio->messages->create($request->input('phone'), ['from' => env('TWILIO_FROM'), 'body' => $message]);

        return response()->json(['message' => $phone], 200);
    }
}
