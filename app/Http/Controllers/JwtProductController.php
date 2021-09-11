<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use JWTAuth;
use App\Models\User;
use Illuminate\Support\Str;

class JwtProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = JWTAuth::parseToken()->authenticate();

        if (!$user->is_admin) {

            return response()->json(['status' => 'not_authorized'], 403);
        }

        $result = Product::latest()->paginate(20);

        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();

        if (!$user->is_admin) {

            return response()->json(['status' => 'not_authorized'], 403);
        }

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|numeric'
        ]);

        $product = new Product();

        $product->name = $request->name;
        $product->description = $request->description;
        $product->slug = Str::slug($request->name, "-");
        $product->image = $request->image;
        $product->price = $request->price;
        $product->stock = $request->stock;

        $product->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $user = JWTAuth::parseToken()->authenticate();

        if (!$user->is_admin) {

            return response()->json(['status' => 'not_authorized'], 403);
        }

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'slug' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|numeric'
        ]);

        $product = Product::findOrFail($request->id);

        $product->name = $request->name;
        $product->description = $request->description;
        $product->slug = Str::slug($request->name, "-");
        $product->image = $request->image;
        $product->price = $request->price;
        $product->stock = $request->stock;

        $product->save();

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();

        if (!$user->is_admin) {

            return response()->json(['status' => 'not_authorized'], 403);
        }

        return Product::destroy($request->id);
    }
}
