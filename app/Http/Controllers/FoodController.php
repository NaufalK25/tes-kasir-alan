<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class FoodController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fileName = time() . '_' . $request->foto->getClientOriginalName();
        $filePath = $request->file('foto')->storeAs('uploads', $fileName, 'public');

        $food = new Food([
            'nama' => $request->nama,
            'foto' => '/storage/' . $filePath,
            'harga' => $request->harga,
        ]);
        $food->save();

        return Redirect::back()->with('type', 'success')->with('message', 'Makanan berhasil ditambahkan!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Food $food)
    {
        $currentFood = $food->find($request->id);

        if (!$currentFood) {
            return Redirect::back()->with('type', 'error')->with('message', 'Makanan gagal diedit!');
        }

        $data = [
            'nama' => $request->nama ?? $currentFood->nama,
            'harga' => $request->harga ?? $currentFood->harga,
        ];

        if ($request->hasFile('foto')) {
            $this->deletePhoto($currentFood);

            $fileName = time() . '_' . $request->foto->getClientOriginalName();
            $filePath = $request->file('foto')->storeAs('uploads', $fileName, 'public');
            $currentFood->update([
                ...$data,
                'foto' => '/storage/' . $filePath
            ]);
        } else {
            $currentFood->update($data);
        }

        return Redirect::back()->with('type', 'success')->with('message', 'Makanan berhasil diedit!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Food $food)
    {
        $currentFood = $food->find($request->id);

        if (!$currentFood) {
            return Redirect::back()->with('type', 'error')->with('message', 'Makanan gagal diedit!');
        }

        $this->deletePhoto($currentFood);
        $food->destroy($request->id);

        return Redirect::back()->with('type', 'success')->with('message', 'Makanan berhasil dihapus!');
    }

    private function deletePhoto(Food $food)
    {
        $photoPath = 'public/' . str_replace('/storage/', '', $food->foto);

        if (Storage::fileExists($photoPath)) {
            Storage::delete($photoPath);
        }
    }
}
