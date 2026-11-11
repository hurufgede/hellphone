<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PhoneController;
use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CatalogController::class, 'index'])->name('home');
Route::get('/phone/{phone:slug}', [CatalogController::class, 'show'])->name('phones.show');

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('phones', PhoneController::class)->except(['show']);
    });

require __DIR__.'/settings.php';
