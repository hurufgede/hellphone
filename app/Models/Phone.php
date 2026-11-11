<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Phone extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'brand',
        'price',
        'compare_price',
        'condition',
        'grade',
        'ram',
        'storage',
        'battery_health',
        'color',
        'stock',
        'description',
        'image_url',
        'accent',
        'is_featured',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'compare_price' => 'integer',
            'battery_health' => 'integer',
            'stock' => 'integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Phone $phone) {
            if (empty($phone->slug)) {
                $phone->slug = static::generateSlug($phone->name);
            }
        });
    }

    public static function generateSlug(string $name): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 2;
        while (static::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $query->when($filters['q'] ?? null, function (Builder $q, string $term) {
            $term = trim($term);
            $q->where(function (Builder $inner) use ($term) {
                $inner->where('name', 'like', "%{$term}%")
                    ->orWhere('brand', 'like', "%{$term}%")
                    ->orWhere('ram', 'like', "%{$term}%")
                    ->orWhere('storage', 'like', "%{$term}%");
            });
        });

        $query->when($filters['brand'] ?? null, fn (Builder $q, string $brand) => $q->where('brand', $brand));
        $query->when($filters['condition'] ?? null, fn (Builder $q, string $condition) => $q->where('condition', $condition));
        $query->when($filters['max_price'] ?? null, fn (Builder $q, string $max) => $q->where('price', '<=', (int) $max));

        match ($filters['sort'] ?? 'newest') {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'name' => $query->orderBy('name'),
            default => $query->latest(),
        };

        return $query;
    }

    public function discountPercent(): ?int
    {
        if ($this->compare_price && $this->compare_price > $this->price) {
            return (int) round((1 - $this->price / $this->compare_price) * 100);
        }

        return null;
    }
}
