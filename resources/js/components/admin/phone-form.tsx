import { useForm } from '@inertiajs/react';
import { Check, ImagePlus, LoaderCircle, Star, Eye } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { ACCENT_KEYS, ACCENTS } from '@/lib/accents';
import { cn } from '@/lib/utils';
import type { AccentKey, Phone } from '@/types';

export interface PhoneFormData {
    name: string;
    brand: string;
    price: number | '';
    compare_price: number | '' | null;
    condition: 'new' | 'used';
    grade: 'A' | 'B' | 'C' | '' | null;
    ram: string;
    storage: string;
    battery_health: number | '' | null;
    color: string;
    stock: number | '';
    description: string;
    image_url: string;
    image: File | null;
    accent: AccentKey;
    is_featured: boolean;
    is_active: boolean;
}

interface PhoneFormProps {
    mode: 'create' | 'edit';
    initial?: Phone;
    brands: string[];
    accents: string[];
}

const inputClass =
    'h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-teal-500 focus:ring-2 focus:ring-teal-500/25';

export default function PhoneForm({ mode, initial, brands }: PhoneFormProps) {
    const { data, setData, post, put, processing, errors, transform } =
        useForm<PhoneFormData>({
            name: initial?.name ?? '',
            brand: initial?.brand ?? '',
            price: initial?.price ?? '',
            compare_price: initial?.compare_price ?? '',
            condition: initial?.condition ?? 'new',
            grade: initial?.grade ?? '',
            ram: initial?.ram ?? '',
            storage: initial?.storage ?? '',
            battery_health: initial?.battery_health ?? '',
            color: initial?.color ?? '',
            stock: initial?.stock ?? 1,
            description: initial?.description ?? '',
            image_url: initial?.image_url ?? '',
            image: null,
            accent: (initial?.accent as AccentKey) ?? 'violet',
            is_featured: initial?.is_featured ?? false,
            is_active: initial?.is_active ?? true,
        });

    const isUsed = data.condition === 'used';
    const [preview, setPreview] = useState(data.image_url);
    const [fileError, setFileError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        if (file.size > 50 * 1024 * 1024) {
            setFileError('Ukuran foto maksimal 50 MB.');
            e.target.value = '';
            return;
        }
        setFileError('');
        setData('image', file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((formData) => ({
            ...formData,
            price: formData.price === '' ? 0 : Number(formData.price),
            compare_price:
                formData.compare_price === ''
                    ? null
                    : Number(formData.compare_price),
            battery_health:
                formData.battery_health === ''
                    ? null
                    : Number(formData.battery_health),
            stock: formData.stock === '' ? 0 : Number(formData.stock),
            grade:
                formData.condition === 'used' ? formData.grade || null : null,
        }));

        if (mode === 'create') {
            post('/admin/phones');
        } else if (initial) {
            put(`/admin/phones/${initial.id}`);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            {/* ===== Identitas ===== */}
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-sm font-bold text-card-foreground">
                    Identitas Produk
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <Label htmlFor="name">Nama Handphone *</Label>
                        <input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="iPhone 17 Pro Max 256GB"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError message={errors.name} className="mt-1.5" />
                    </div>
                    <div>
                        <Label htmlFor="brand">Brand *</Label>
                        <input
                            id="brand"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                            list="brand-suggestions"
                            placeholder="Apple"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <datalist id="brand-suggestions">
                            {brands.map((brand) => (
                                <option key={brand} value={brand} />
                            ))}
                        </datalist>
                        <InputError message={errors.brand} className="mt-1.5" />
                    </div>
                    <div>
                        <Label htmlFor="color">Warna</Label>
                        <input
                            id="color"
                            value={data.color}
                            onChange={(e) => setData('color', e.target.value)}
                            placeholder="Cosmic Orange"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError message={errors.color} className="mt-1.5" />
                    </div>
                </div>
            </section>

            {/* ===== Kondisi ===== */}
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-sm font-bold text-card-foreground">
                    Kondisi Unit
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Label>Status *</Label>
                        <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-xl border border-input bg-muted/40 p-1">
                            {(['new', 'used'] as const).map((condition) => (
                                <button
                                    key={condition}
                                    type="button"
                                    onClick={() =>
                                        setData('condition', condition)
                                    }
                                    className={cn(
                                        'rounded-lg py-2.5 text-xs font-extrabold tracking-wider uppercase transition-all',
                                        data.condition === condition
                                            ? condition === 'new'
                                                ? 'bg-emerald-500 text-emerald-950 shadow'
                                                : 'bg-amber-400 text-amber-950 shadow'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {condition === 'new' ? 'Baru' : 'Second'}
                                </button>
                            ))}
                        </div>
                        <InputError
                            message={errors.condition}
                            className="mt-1.5"
                        />
                    </div>

                    {isUsed && (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="grade">Grade *</Label>
                                <select
                                    id="grade"
                                    value={data.grade ?? ''}
                                    onChange={(e) =>
                                        setData(
                                            'grade',
                                            e.target
                                                .value as PhoneFormData['grade'],
                                        )
                                    }
                                    className={cn(inputClass, 'mt-1.5')}
                                >
                                    <option value="">Pilih</option>
                                    <option value="A">
                                        A — Mulus like new
                                    </option>
                                    <option value="B">B — Lecet wajar</option>
                                    <option value="C">C — Minus berat</option>
                                </select>
                                <InputError
                                    message={errors.grade}
                                    className="mt-1.5"
                                />
                            </div>
                            <div>
                                <Label htmlFor="battery_health">
                                    Battery Health % *
                                </Label>
                                <input
                                    id="battery_health"
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={data.battery_health ?? ''}
                                    onChange={(e) =>
                                        setData(
                                            'battery_health',
                                            e.target.value === ''
                                                ? ''
                                                : Number(e.target.value),
                                        )
                                    }
                                    placeholder="89"
                                    className={cn(inputClass, 'mt-1.5')}
                                />
                                <InputError
                                    message={errors.battery_health}
                                    className="mt-1.5"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== Harga & stok ===== */}
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-sm font-bold text-card-foreground">
                    Harga & Stok
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Label htmlFor="price">Harga Jual (Rp) *</Label>
                        <input
                            id="price"
                            type="number"
                            min={0}
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    'price',
                                    e.target.value === ''
                                        ? ''
                                        : Number(e.target.value),
                                )
                            }
                            placeholder="12999000"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError message={errors.price} className="mt-1.5" />
                    </div>
                    <div>
                        <Label htmlFor="compare_price">Harga Coret (Rp)</Label>
                        <input
                            id="compare_price"
                            type="number"
                            min={0}
                            value={data.compare_price ?? ''}
                            onChange={(e) =>
                                setData(
                                    'compare_price',
                                    e.target.value === ''
                                        ? ''
                                        : Number(e.target.value),
                                )
                            }
                            placeholder="14999000 (opsional)"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError
                            message={errors.compare_price}
                            className="mt-1.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="ram">RAM *</Label>
                        <input
                            id="ram"
                            value={data.ram}
                            onChange={(e) => setData('ram', e.target.value)}
                            placeholder="8GB"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError message={errors.ram} className="mt-1.5" />
                    </div>
                    <div>
                        <Label htmlFor="storage">Storage *</Label>
                        <input
                            id="storage"
                            value={data.storage}
                            onChange={(e) => setData('storage', e.target.value)}
                            placeholder="256GB"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError
                            message={errors.storage}
                            className="mt-1.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="stock">Stok (unit) *</Label>
                        <input
                            id="stock"
                            type="number"
                            min={0}
                            value={data.stock}
                            onChange={(e) =>
                                setData(
                                    'stock',
                                    e.target.value === ''
                                        ? ''
                                        : Number(e.target.value),
                                )
                            }
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError message={errors.stock} className="mt-1.5" />
                    </div>
                </div>
            </section>

            {/* ===== Tampilan ===== */}
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-sm font-bold text-card-foreground">
                    Tampilan Katalog
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <Label>Gradien Kartu *</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {ACCENT_KEYS.map((key) => {
                                const theme = ACCENTS[key];
                                const active = data.accent === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setData('accent', key)}
                                        title={theme.label}
                                        aria-pressed={active}
                                        className={cn(
                                            'relative flex h-11 w-16 items-center justify-center rounded-xl border transition-all',
                                            active
                                                ? 'scale-110 border-white/60 ring-2 ring-teal-500'
                                                : 'border-white/10 hover:scale-105',
                                        )}
                                        style={{
                                            background: `linear-gradient(140deg, ${theme.a}, ${theme.b})`,
                                        }}
                                    >
                                        {active && (
                                            <Check
                                                className="size-4 text-white drop-shadow"
                                                strokeWidth={3}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <InputError
                            message={errors.accent}
                            className="mt-1.5"
                        />

                        <Label htmlFor="image" className="mt-4 block">
                            Foto Produk
                        </Label>
                        <div className="mt-1.5 flex items-center gap-4">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview foto"
                                    className="size-24 shrink-0 rounded-xl border border-border object-cover"
                                />
                            ) : (
                                <div className="flex size-24 shrink-0 items-center justify-center rounded-xl border border-dashed border-input text-muted-foreground">
                                    <ImagePlus className="size-6" />
                                </div>
                            )}
                            <div className="min-w-0">
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                                <label
                                    htmlFor="image"
                                    className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-input bg-background px-4 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                                >
                                    <ImagePlus className="size-4" />
                                    {preview
                                        ? 'Ganti Foto'
                                        : 'Pilih dari Galeri / File'}
                                </label>
                                <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
                                    JPG, PNG, WebP — maks 50 MB. Di HP bisa
                                    langsung dari galeri.
                                </p>
                            </div>
                        </div>
                        <InputError
                            message={fileError || errors.image}
                            className="mt-1.5"
                        />

                        <Label htmlFor="image_url" className="mt-3 block">
                            URL Foto (opsional)
                        </Label>
                        <input
                            id="image_url"
                            type="url"
                            value={data.image_url}
                            onChange={(e) => {
                                setData('image_url', e.target.value);
                                if (!data.image) {
                                    setPreview(e.target.value);
                                }
                            }}
                            placeholder="https://... (kosongkan untuk gradien otomatis)"
                            className={cn(inputClass, 'mt-1.5')}
                        />
                        <InputError
                            message={errors.image_url}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Deskripsi</Label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            rows={6}
                            placeholder="Kelengkapan, minus pemakaian, bonus, garansi..."
                            className="mt-1.5 w-full rounded-xl border border-input bg-background p-3.5 text-sm outline-none placeholder:text-muted-foreground focus:border-teal-500 focus:ring-2 focus:ring-teal-500/25"
                        />
                        <InputError
                            message={errors.description}
                            className="mt-1.5"
                        />

                        {/* toggles */}
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setData('is_featured', !data.is_featured)
                                }
                                aria-pressed={data.is_featured}
                                className={cn(
                                    'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition-all',
                                    data.is_featured
                                        ? 'border-amber-400/50 bg-amber-400/15 text-amber-500'
                                        : 'border-border text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <Star
                                    className={cn(
                                        'size-4',
                                        data.is_featured && 'fill-amber-400',
                                    )}
                                />
                                Featured
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setData('is_active', !data.is_active)
                                }
                                aria-pressed={data.is_active}
                                className={cn(
                                    'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition-all',
                                    data.is_active
                                        ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-600 dark:text-emerald-400'
                                        : 'border-border text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <Eye className="size-4" />
                                {data.is_active
                                    ? 'Tampil di Katalog'
                                    : 'Disembunyikan'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Submit ===== */}
            <div className="flex items-center justify-end gap-2">
                <a
                    href="/admin/phones"
                    className="rounded-xl border border-border px-5 py-3 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                >
                    Batal
                </a>
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-500 disabled:opacity-50"
                >
                    {processing && (
                        <LoaderCircle className="size-4 animate-spin" />
                    )}
                    {mode === 'create'
                        ? 'Simpan Handphone'
                        : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
    );
}
