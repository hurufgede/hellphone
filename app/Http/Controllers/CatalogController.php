<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    /**
     * Katalog publik — bisa diakses tanpa login.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['q', 'brand', 'condition', 'sort', 'max_price']);

        $phones = Phone::query()
            ->active()
            ->filter($filters)
            ->paginate(9)
            ->withQueryString()
            ->through(fn (Phone $phone) => $this->phoneData($phone));
        $brands = Phone::query()
            ->active()
            ->selectRaw('brand, COUNT(*) as total')
            ->groupBy('brand')
            ->orderByDesc('total')
            ->get();

        $stats = [
            'in_stock' => (int) Phone::query()->active()->sum('stock'),
            'brands' => Phone::query()->active()->distinct()->count('brand'),
            'models' => Phone::query()->active()->count(),
        ];

        return Inertia::render('catalog/home', [
            'phones' => $phones,
            'brands' => $brands,
            'filters' => [
                'q' => $filters['q'] ?? '',
                'brand' => $filters['brand'] ?? '',
                'condition' => $filters['condition'] ?? '',
                'sort' => $filters['sort'] ?? 'newest',
                'max_price' => $filters['max_price'] ?? '',
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Halaman detail handphone.
     */
    public function show(Phone $phone): Response
    {
        abort_unless($phone->is_active, 404);

        $similar = Phone::query()
            ->active()
            ->where('brand', $phone->brand)
            ->where('id', '!=', $phone->id)
            ->latest()
            ->take(4)
            ->get()
            ->map(fn (Phone $item) => $this->phoneData($item));

        return Inertia::render('catalog/phone', [
            'phone' => $this->phoneData($phone),
            'similar' => $similar,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function phoneData(Phone|Model $phone): array
    {
        return [
            'id' => $phone->id,
            'name' => $phone->name,
            'slug' => $phone->slug,
            'brand' => $phone->brand,
            'price' => $phone->price,
            'compare_price' => $phone->compare_price,
            'discount' => $phone->discountPercent(),
            'condition' => $phone->condition,
            'grade' => $phone->grade,
            'ram' => $phone->ram,
            'storage' => $phone->storage,
            'battery_health' => $phone->battery_health,
            'color' => $phone->color,
            'stock' => $phone->stock,
            'description' => $phone->description,
            'image_url' => $phone->image_url,
            'accent' => $phone->accent,
            'is_featured' => $phone->is_featured,
            'created_at' => $phone->created_at?->toISOString(),
        ];
    }
}
