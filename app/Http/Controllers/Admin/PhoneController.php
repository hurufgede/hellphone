<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Phone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PhoneController extends Controller
{
    private const ACCENTS = ['violet', 'cyan', 'amber', 'rose', 'emerald', 'sky', 'fuchsia', 'lime'];

    /**
     * Daftar handphone dengan pencarian & filter.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['q', 'brand', 'condition']);

        $phones = Phone::query()
            ->filter(array_merge($filters, ['sort' => 'latest']))
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Phone $phone) => $this->phoneData($phone));

        $brands = Phone::query()
            ->selectRaw('brand, COUNT(*) as total')
            ->groupBy('brand')
            ->orderBy('brand')
            ->get();

        return Inertia::render('admin/phones/index', [
            'phones' => $phones,
            'brands' => $brands,
            'filters' => [
                'q' => $filters['q'] ?? '',
                'brand' => $filters['brand'] ?? '',
                'condition' => $filters['condition'] ?? '',
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/phones/create', [
            'brands' => Phone::query()->distinct()->orderBy('brand')->pluck('brand'),
            'accents' => self::ACCENTS,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatePhone($request);
        $data['slug'] = Phone::generateSlug($data['name']);

        if ($request->hasFile('image')) {
            $data['image_url'] = '/storage/'.$request->file('image')->store('phones', 'public');
        }

        Phone::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Handphone berhasil ditambahkan.']);

        return to_route('admin.phones.index');
    }

    public function edit(Phone $phone): Response
    {
        return Inertia::render('admin/phones/edit', [
            'phone' => $this->phoneData($phone),
            'brands' => Phone::query()->distinct()->orderBy('brand')->pluck('brand'),
            'accents' => self::ACCENTS,
        ]);
    }

    public function update(Request $request, Phone $phone): RedirectResponse
    {
        $data = $this->validatePhone($request);

        if ($data['name'] !== $phone->name) {
            $data['slug'] = Phone::generateSlug($data['name']);
        }

        if ($request->hasFile('image')) {
            $newPath = $request->file('image')->store('phones', 'public');
            $this->deleteUploadedImage($phone->image_url);
            $data['image_url'] = '/storage/'.$newPath;
        }

        $phone->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data handphone berhasil diperbarui.']);

        return to_route('admin.phones.index');
    }

    public function destroy(Phone $phone): RedirectResponse
    {
        $this->deleteUploadedImage($phone->image_url);

        $phone->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Handphone berhasil dihapus.']);

        return back();
    }

    private function deleteUploadedImage(?string $imageUrl): void
    {
        if ($imageUrl && Str::startsWith($imageUrl, '/storage/')) {
            Storage::disk('public')->delete(Str::after($imageUrl, '/storage/'));
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function validatePhone(Request $request): array
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'brand' => ['required', 'string', 'max:50'],
            'price' => ['required', 'integer', 'min:100000', 'max:500000000'],
            'compare_price' => ['nullable', 'integer', 'min:100000', 'max:500000000', 'gt:price'],
            'condition' => ['required', Rule::in(['new', 'used'])],
            'grade' => ['nullable', Rule::in(['A', 'B', 'C']), 'required_if:condition,used'],
            'ram' => ['required', 'string', 'max:20'],
            'storage' => ['required', 'string', 'max:20'],
            'battery_health' => ['nullable', 'integer', 'min:1', 'max:100', 'required_if:condition,used'],
            'color' => ['nullable', 'string', 'max:50'],
            'stock' => ['required', 'integer', 'min:0', 'max:10000'],
            'description' => ['nullable', 'string', 'max:2000'],
            'image' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:51200'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'accent' => ['required', Rule::in(self::ACCENTS)],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
        ], [
            'grade.required_if' => 'Grade wajib diisi untuk HP second (A/B/C).',
            'battery_health.required_if' => 'Battery health wajib diisi untuk HP second.',
            'compare_price.gt' => 'Harga coret harus lebih besar dari harga jual.',
            'image.max' => 'Ukuran foto maksimal 50 MB.',
            'image.image' => 'File harus berupa gambar.',
        ]);

        unset($validated['image']);

        if ($validated['condition'] === 'new') {
            $validated['grade'] = null;
            $validated['battery_health'] = null;
        }

        return $validated;
    }

    /**
     * @return array<string, mixed>
     */
    private function phoneData(Phone $phone): array
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
            'is_active' => $phone->is_active,
            'created_at' => $phone->created_at?->toISOString(),
        ];
    }
}
