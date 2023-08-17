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
        if ($request->has('code')) {
            $inputCode = $request->input('code');

            if (Session::has('user') && Session::has('code')) {
                $dataUser = Session::get('user');
                $code = Session::get('code');

                if ($code == $inputCode) {
                    $user = new User();
                    $user->name = $dataUser['username'];
                    $user->email = $dataUser['email'];
                    $user->phone = $dataUser['phone'];
                    $user->password = $dataUser['password'];
                    $user->phone_verified_at = now();
                    $user->save();

                    Auth::login($user, true);
                    $accessToken = $user->createToken('authToken')->plainTextToken;

                    return response()->json(['message' => 'Compte créé', 'access_token' => $accessToken], 200);
                } else {
                    return response()->json(['message' => 'Code d\'authentification incorrect'], 401);
                }
            } else {
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }
        } else {
            return response()->json(['message' => 'Code d\'authentification manquant'], 400);
        }
    }




    /**
     * Retrieves user data from the session.
     *
     * @throws Some_Exception_Class If the user data is not found in the session.
     * @return Some_Return_Value JSON response containing the user data if found, or a message if not found.
     */
    public function recup_userData()
    {
        if (Session::has('user')) {
            $user = Session::get('user'); // Utilisez 'user' au lieu de 'users'
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['message' => 'User not Found'], 404);
        }
    }

    /**
     * Send an SMS with a verification code to the user's phone number.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSMS()
    {
        // Check if a user is logged in
        if (Session::has('user')) {
            // Get the user's information from the session
            $user = Session::get('user');

            // Create a new Twilio client with the account SID and auth token from the environment variables
            $twilio = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));

            // Generate a random 6-digit verification code
            $code = mt_rand(100000, 999999);

            // Store the verification code in the session
            Session::put('code', $code);

            // Create the message body with the verification code
            $message = "Votre code de vérification est : $code";

            // Send the SMS message using Twilio
            // $twilio->messages->create($user['phone'], ['from' => env('TWILIO_FROM'), 'body' => $message]);

            // Return a JSON response indicating that the code has been sent
            return response()->json(['code' => $code], 200);
        } else {
            // Return a JSON response indicating that the user was not found
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
