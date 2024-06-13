<?php

use App\Http\Controllers\UrlController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

Route::get('/', [UrlController::class, 'index'])->name('home');
Route::post('/check', [UrlController::class, 'store'])->name('store');
Route::get('/check/{search}', [UrlController::class, 'show'])->name('show');

Broadcast::routes();