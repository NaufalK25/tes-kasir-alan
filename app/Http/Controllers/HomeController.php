<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::orderByDesc('updated_at')->get();
        return Inertia::render('Home', [
            'foods' => $foods
        ]);
    }
}
