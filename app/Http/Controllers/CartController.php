<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Models\Product;
use App\Models\CartProduct;
use App\Models\Cart;
use App\Models\User;

use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{

    private function getUser() {

        try {

            $user = JWTAuth::parseToken()->authenticate();

            return $user;
        } catch (JWTException $e) {

            throw new Exception('unauthorized');
        }
    }

    private function getCartOrCreateOne($cart_id) {

        try {

            $user = $this->getUser();
            $cart = null;

            if ($cart_id) {

                $cart = DB::table('carts')
                            ->where('id', $cart_id)
                            ->where('closed', 0)
                            ->first();
            } else {

                $cart = DB::table('carts')
                            ->where('user_id', $user->id)
                            ->where('closed', 0)
                            ->first();
            }

            if (!$cart) {

                $cart = new Cart();

                $cart->user_id = $user->id;

                $cart->save();
            }

            return $cart;
        } catch(Exception $e) {

            throw $e;
        }
    }

    private function addItemOrCreateOne($cart_id, $product_id, $product_quantity) {

        $item = null;

        try {

            $item = DB::table('cart_products')
                        ->where('cart_id', $cart_id)
                        ->where('product_id', $product_id);

            if ($item->first()) {

                $item->update(['product_quantity' => DB::raw('product_quantity + '. $product_quantity)]);
            } else {

                $item = new CartProduct();
                $item->cart_id = $cart_id;
                $item->product_id = $product_id;

                $item->product_quantity = $product_quantity;

                $item->save();
            }
        } catch(Exception $e) {

        }
    }

    private function removeItemOrDelete($cart_id, $product_id, $all) {

        try {

            $query = DB::table('cart_products')
                        ->where('cart_id', $cart_id)
                        ->where('product_id', $product_id);

            $item = $query->first();

            if (!$item) {

                return true;
            } else {

                if ($item->product_quantity === 1 or $all) {

                    DB::table('cart_products')
                        ->where('cart_id', $cart_id)
                        ->where('product_id', $product_id)
                        ->delete();
                } else {

                    $query->update(['product_quantity' => DB::raw('product_quantity - 1')]);
                }
            }
        } catch(Exception $e) {

        }
    }

    //
    public function index(Request $request) {

        try {

            $cart = $this->getCartOrCreateOne($request->cart_id);

            foreach ($request->items as $item_in_device) {

                // todo: validate item

                DB::table('cart_products')
                    ->updateOrInsert(
                        [ 'cart_id' => $cart->id, 'product_id' => $item_in_device['product_id'] ],
                        [ 'product_quantity' => $item_in_device['product_quantity']]
                    );
            }

            $items_in_db = DB::table('cart_products')
                                ->where('cart_id', $cart->id)
                                ->get();

            foreach ($items_in_db as $item) {

                $product = Product::find($item->product_id);

                $item->name = $product->name;
                $item->image = $product->image;
                $item->discount_price = $product->discount_price;
                $item->price = $product->price;
            }

        } catch (Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }

        return response()->json([
            'id' => $cart->id,
            'items' => $items_in_db,
        ]);
    }

    public function addItem(Request $request) {

        try {

            $cart = $this->getCartOrCreateOne($request->cart_id);

            $this->addItemOrCreateOne($cart->id, $request->product_id, $request->product_quantity);

            return response()->json([
                'success' => true,
            ]);
        } catch (Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function removeItem(Request $request) {

        try {

            $cart = $this->getCartOrCreateOne($request->cart_id);

            $this->removeItemOrDelete($cart->id, $request->product_id, $request->all);

            return response()->json([
                'success' => true,
            ]);
        } catch(Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}
