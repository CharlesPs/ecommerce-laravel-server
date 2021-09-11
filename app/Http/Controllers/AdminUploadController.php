<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Str;

class AdminUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function image(Request $request)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();

        if (!$user->is_admin) {

            return response()->json(['status' => 'not_authorized'], 403);
        }

        $file = $request->files->get('file');

        $folder = $request->get('folder');

        if (!$file) {

            return response()->json(['status' => 'no_file'], 500);
        }

        $new_folder = __DIR__ . '/../../../public/uploads/' . $folder . '/';

        $parts = explode('.', $file->getClientOriginalName());

        $ext = $parts[count($parts) - 1];

        $name = array_pop($parts);

        $file_name = uniqid() . '-' . Str::slug(implode('-', $parts), '-') . '.' . $ext;

        $full_path = 'uploads/' . $folder . '/' . $file_name;

        try {

            $file->move($new_folder, $file_name);
        } catch (FileException $e) {

            return response()->json(['status' => $e->getMessage()], 500);
        }

        return response()->json([
            'status' => 'ok',
            'data' => [
                'folder' => $folder,
                'file_name' => $file_name,
                'full_path' => $full_path
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
