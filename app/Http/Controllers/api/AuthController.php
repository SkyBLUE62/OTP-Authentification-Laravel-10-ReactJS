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
    public function setDataUser(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = Hash::make($request->input('password'));
        $confirmpass = $request->input('confirmpass');

        if (User::where('name', $username)->exists()) {
            return response()->json([
                'msgError' => 'This username already exists please choose another one',
                'inputError' => 'username',
            ], 422);
        }
        if (User::where('phone', $phone)->exists()) {
            return response()->json([
                'msgError' => 'This telephone number is already assigned to an account',
                'inputError' => 'phone',
            ], 422);
        }
        if (User::where('email', $email)->exists()) {
            return response()->json([
                'msgError' => 'This email is already assigned to an account',
                'inputError' => 'email',
            ], 422);
        }

        $dataUser = [
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
            'password' => $password,
        ];
        Session::put('token', Str::random(60));
        Session::put('user', $dataUser);

        return response()->json(['user' => $dataUser, 'token' => Session::get('token')], 200);
    }

    /**
     * Verify the provided authentication code and create a new user if the code is correct.
     *
     * @param Request $request The request object containing the authentication code.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the result of the verification process.
     */
    public function verify_code(Request $request)
    {
        // Check if the code parameter is present in the request
        if ($request->has('code')) {
            $inputCode = $request->input('code');

            if (Session::has('reset_password') && Session::has('user') && Session::has('code')) {
                $dataUser = Session::get('user');
                $code = Session::get('code');
                if ($code == $inputCode) {
                    Session::forget('code');
                    $token = Str::random(60);
                    Session::put('token', $token);
                    return response()->json(['message' => 'Code d\'authentification correct', 'token' => $token], 200);
                } else {
                    return response()->json(['message' => 'Code d\'authentification correct'], 401);
                }
            }

            // Check if the user and code are stored in the session
            if (Session::has('user') && Session::has('code')) {
                $dataUser = Session::get('user');
                $code = Session::get('code');

                // Verify if the provided code matches the stored code
                if ($code == $inputCode) {
                    // Check if the user exists
                    if (User::where('name', $dataUser['name'])->exists()) {
                        $accessToken = $this->login();
                        Session::forget(['code', 'user', 'token']);
                        return response()->json(['message' => 'Login', 'access_token' => $accessToken], 200);
                    } else {
                        $accessToken = $this->register();
                        Session::forget(['code', 'user', 'token']);
                        return response()->json(['message' => 'Compte créé', 'access_token' => $accessToken], 200);
                    }
                } else {
                    // Return an error response if the provided code is incorrect
                    return response()->json(['message' => 'Code d\'authentification incorrect'], 401);
                }
            } else {
                // Return an error response if the user or code is not found in the session
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }
        } else {
            // Return an error response if the code parameter is missing in the request
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
            // Retrieve user data from the session
            $user = Session::get('user');

            // Return JSON response with user data
            return response()->json(['user' => $user], 200);
        } else if (Auth::check()) {
            return response()->json(['user' => Auth::user()], 200);
        } else {
            // Return JSON response with error message
            return response()->json(['message' => 'User not Found'], 404);
        }
    }

    /**
     * Verify the token in the request.
     *
     * @param Request $request The HTTP request.
     * @return JsonResponse The JSON response.
     */
    public function verify_token(Request $request)
    {
        // Check if the token and user session exist
        if ($request->has('token') && Session::has('user') && Session::has('token')) {
            $token = $request->input('token');
            $valideToken = Session::get('token');

            // Check if the token is valid
            if ($token == $valideToken) {
                return response()->json(['message' => 'Token valide'], 200);
            } else {
                return response()->json(['message' => 'Token not valide'], 401);
            }
        } else {
            return response()->json(['message' => 'User or Token not exist'], 401);
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
        }

        // Return a JSON response indicating that the user was not found
        return response()->json(['message' => 'User not found'], 404);
    }

    /**
     * Checks if the user is authenticated.
     *
     * @throws Some_Exception_Class description of exception
     * @return \Illuminate\Http\JsonResponse Returns a JSON response containing the user if authenticated, or a response indicating that the user is not logged in.
     */
    public function authCheck()
    {
        if (Auth::check()) {
            return response()->json(['user' => Auth::user()], 200);
        } else {
            return response()->json(['isLoggedIn' => false], 401);
        }
    }

    public function verify_user(Request $request)
    {
        $user = $request->input('username');
        $password = $request->input('password');
        if (User::where('name', $user)->exists()) {
            $user = User::where('name', $user)->first();
            if (Hash::check($password, $user->password)) {

                $token = Str::random(60);
                Session::put('user', $user);
                Session::put('token', $token);

                return response()->json([
                    'message' => 'Correct Information',
                    'token' => $token
                ], 200);
            }
        }
        return response()->json(['message' => 'Username or Password is incorrect'], 401);
    }

    public function register()
    {
        $dataUser = Session::get('user');
        // Create a new user with the provided user data
        $user = new User();
        $user->name = $dataUser['username'];
        $user->email = $dataUser['email'];
        $user->phone = $dataUser['phone'];
        $user->password = $dataUser['password'];
        $user->phone_verified_at = now();
        $user->save();

        // Log the user in and generate an access token
        Auth::login($user);
        $accessToken = $user->createToken('authToken')->plainTextToken;

        return $accessToken;
    }

    public function login()
    {
        $dataUser = Session::get('user');
        $user = User::where('name', $dataUser['name'])->first();
        // Log the user in
        if ($dataUser['remember'] == true) Auth::login($user, true);
        else Auth::login($user);
        // Create an access token
        $accessToken = $user->createToken('authToken')->plainTextToken;

        return $accessToken;
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            $request->user()->tokens()->delete();
            auth()->guard('web')->logout();
            Auth::logout();
            return response()->json(['message' => 'Logout'], 200);
        } else {
            return response()->json(['message' => 'Not Logged'], 401);
        }
    }

    public function checkForgotPassword(Request $request)
    {

        $username = $request->input('username');
        $phone = $request->input('phone');

        if (User::where(['name' => $username, 'phone' => $phone])->exists()) {
            $user = User::where(['name' => $username, 'phone' => $phone])->first();
            $token = Str::random(60);
            Session::put('user', $user);
            Session::put('token', $token);
            Session::put('reset_password', true);
            return response()->json(['message' => 'User found', 'token' => $token], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
