<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Phone;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $phones = Phone::query();

        $stats = [
            'total_models' => (clone $phones)->count(),
            'total_stock' => (int) (clone $phones)->sum('stock'),
            'new_models' => (clone $phones)->where('condition', 'new')->count(),
            'used_models' => (clone $phones)->where('condition', 'used')->count(),
            'stock_value' => (int) (clone $phones)->selectRaw('COALESCE(SUM(price * stock), 0) as value')->value('value'),
            'featured' => (clone $phones)->where('is_featured', true)->count(),
        ];

        $lowStock = Phone::query()
            ->where('stock', '<=', 3)
            ->where('is_active', true)
            ->orderBy('stock')
            ->take(5)
            ->get(['id', 'name', 'brand', 'stock', 'slug', 'accent', 'condition']);

        $recent = Phone::query()
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Phone $phone) => [
                'id' => $phone->id,
                'name' => $phone->name,
                'brand' => $phone->brand,
                'price' => $phone->price,
                'condition' => $phone->condition,
                'stock' => $phone->stock,
                'accent' => $phone->accent,
                'image_url' => $phone->image_url,
                'created_at' => $phone->created_at?->toISOString(),
            ]);

        $byBrand = Phone::query()
            ->selectRaw('brand, COUNT(*) as total')
            ->groupBy('brand')
            ->orderByDesc('total')
            ->take(6)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'lowStock' => $lowStock,
            'recent' => $recent,
            'byBrand' => $byBrand,
        ]);
    }
}
