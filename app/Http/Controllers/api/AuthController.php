<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register()
    {
        return response()->json(['message' => 'Formulaire soumis avec succès'], 200);
    }
}
