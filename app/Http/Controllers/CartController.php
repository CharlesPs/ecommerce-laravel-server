<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Models\Cart;
use App\Models\User;

use Tymon\JWTAuth\Exceptions\JWTException;

class CartController extends Controller
{
    //
    public function index(Request $request) {

        $user = null;

        $cart_id = $request->cart_id;

        try {

            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {


        }

        return response()->json([
            'status' => $user,
            'cart_id' => $cart_id
        ]);
    }
}
