<?php

use App\Http\Controllers\FoodController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::prefix('/food')->group(function () {
    Route::post('/create', [FoodController::class, 'store'])->name('food.store');
    Route::post('/update', [FoodController::class, 'update'])->name('food.update');
    Route::delete('/delete', [FoodController::class, 'destroy'])->name('food.destroy');
});
