import { Head, router, usePage } from '@inertiajs/react';
import {
    Banknote,
    Check,
    ChevronLeft,
    ChevronRight,
    Eye,
    Info,
    MapPin,
    SearchX,
    SlidersHorizontal,
    Store,
} from 'lucide-react';
import PhoneCard from '@/components/phone-card';
import { waLink } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { BrandCount, Paginated, Phone } from '@/types';

interface Filters {
    q: string;
    brand: string;
    condition: string;
    sort: string;
    max_price: string;
}

interface Props {
    phones: Paginated<Phone>;
    brands: BrandCount[];
    filters: Filters;
    stats: { in_stock: number; brands: number; models: number };
}

const MAX_PRICE_OPTIONS = [
    { value: '', label: 'Semua Harga' },
    { value: '2000000', label: '≤ Rp 2 jt' },
    { value: '5000000', label: '≤ Rp 5 jt' },
    { value: '10000000', label: '≤ Rp 10 jt' },
    { value: '15000000', label: '≤ Rp 15 jt' },
    { value: '20000000', label: '≤ Rp 20 jt' },
];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'price_asc', label: 'Harga Terendah' },
    { value: 'price_desc', label: 'Harga Tertinggi' },
    { value: 'name', label: 'Nama A–Z' },
];

const CONDITION_OPTIONS = [
    { value: '', label: 'Semua Kondisi' },
    { value: 'new', label: 'Baru' },
    { value: 'used', label: 'Second' },
];

export default function Home({ phones, brands, filters, stats }: Props) {
    const { shopWa } = usePage().props as unknown as { shopWa?: string };
    const wa = shopWa ?? '6285717681598';

    const applyFilters = (next: Partial<Filters>) => {
        const params = { ...filters, ...next };
        const query: Record<string, string> = {};
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                query[key] = value;
            }
        }
        router.get('/', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['phones', 'filters', 'brands', 'stats'],
        });
    };

    const goToPage = (page: number) => {
        const query: Record<string, string> = {};
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                query[key] = value;
            }
        }
        query.page = String(page);
        router.get('/', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const resetFilters = () =>
        applyFilters({
            q: '',
            brand: '',
            condition: '',
            max_price: '',
            sort: 'newest',
        });

    const sidebarItem = (active: boolean) =>
        cn(
            'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] font-semibold transition-colors',
            active
                ? 'bg-teal-500/15 text-teal-300'
                : 'text-zinc-300 hover:bg-white/5 hover:text-white',
        );

    return (
        <>
            <Head title="HellPhone" />

            <div className="mx-auto flex max-w-[1440px] items-start gap-4 px-2 py-3 sm:px-4 sm:py-4">
                {/* ============ SIDEBAR (desktop) ============ */}
                <aside className="sticky top-[4.5rem] hidden max-h-[calc(100vh-5.5rem)] w-[300px] shrink-0 overflow-y-auto pr-1 lg:block">
                    <h1 className="px-2 pt-1 text-[26px] font-extrabold tracking-tight text-white">
                        Marketplace
                    </h1>

                    <nav className="mt-3 space-y-0.5">
                        <a
                            href="#katalog"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-zinc-300 transition-colors hover:bg-white/5"
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-white/5">
                                <Store className="size-5" />
                            </span>
                            Jelajahi
                        </a>
                        <a
                            href="#tentang"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-zinc-300 transition-colors hover:bg-white/5"
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-white/5">
                                <Info className="size-5" />
                            </span>
                            Tentang Toko
                        </a>
                    </nav>

                    <div className="my-3 border-t border-white/5" />

                    <p className="px-3 text-[16px] font-bold text-white">
                        Kategori
                    </p>
                    <div className="mt-1.5 space-y-0.5">
                        <button
                            onClick={() => applyFilters({ brand: '' })}
                            className={sidebarItem(!filters.brand)}
                        >
                            Semua Handphone
                            <span className="text-[11px] font-bold text-zinc-500">
                                {stats.in_stock.toLocaleString('id-ID')}
                            </span>
                        </button>
                        {brands.map(({ brand, total }) => (
                            <button
                                key={brand}
                                onClick={() =>
                                    applyFilters({
                                        brand:
                                            filters.brand === brand
                                                ? ''
                                                : brand,
                                    })
                                }
                                className={sidebarItem(filters.brand === brand)}
                            >
                                {brand}
                                <span className="text-[11px] font-bold text-zinc-500">
                                    {total}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="my-3 border-t border-white/5" />

                    <p className="px-3 text-[16px] font-bold text-white">
                        Kondisi
                    </p>
                    <div className="mt-1.5 space-y-0.5">
                        {CONDITION_OPTIONS.map((o) => (
                            <button
                                key={o.value}
                                onClick={() =>
                                    applyFilters({ condition: o.value })
                                }
                                className={sidebarItem(
                                    filters.condition === o.value,
                                )}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>

                    <div className="my-3 border-t border-white/5" />

                    <p className="px-3 text-[16px] font-bold text-white">
                        Harga
                    </p>
                    <div className="mt-1.5 space-y-0.5 pb-4">
                        {MAX_PRICE_OPTIONS.map((o) => (
                            <button
                                key={o.value}
                                onClick={() =>
                                    applyFilters({ max_price: o.value })
                                }
                                className={sidebarItem(
                                    filters.max_price === o.value,
                                )}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ============ KONTEN UTAMA ============ */}
                <div id="katalog" className="min-w-0 flex-1 scroll-mt-24">
                    {/* toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
                        <div>
                            <p className="text-[16px] font-bold text-white">
                                Rekomendasi Untukmu
                            </p>
                            <p className="text-[11px] font-medium text-zinc-500">
                                {stats.models} model ·{' '}
                                {stats.in_stock.toLocaleString('id-ID')} unit
                                ready · menampilkan {phones.from ?? 0}–
                                {phones.to ?? 0} dari {phones.total}
                            </p>
                        </div>

                        <label className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3">
                            <SlidersHorizontal className="size-4 text-zinc-500" />
                            <select
                                value={filters.sort}
                                onChange={(e) =>
                                    applyFilters({ sort: e.target.value })
                                }
                                className="h-full bg-transparent text-[12px] font-bold text-zinc-300 outline-none"
                                aria-label="Urutkan"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* mobile filter chips */}
                    <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:hidden">
                        {CONDITION_OPTIONS.map((o) => (
                            <button
                                key={o.value}
                                onClick={() =>
                                    applyFilters({ condition: o.value })
                                }
                                className={cn(
                                    'rounded-full px-3.5 py-1.5 text-[12px] font-bold whitespace-nowrap shadow-sm transition-colors',
                                    filters.condition === o.value
                                        ? 'bg-teal-600 text-white'
                                        : 'bg-white/5 text-zinc-300',
                                )}
                            >
                                {o.label}
                            </button>
                        ))}
                        <span className="mx-0.5 w-px shrink-0 bg-white/10" />
                        <button
                            onClick={() => applyFilters({ brand: '' })}
                            className={cn(
                                'rounded-full px-3.5 py-1.5 text-[12px] font-bold whitespace-nowrap shadow-sm transition-colors',
                                !filters.brand
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white/5 text-zinc-300',
                            )}
                        >
                            Semua Brand
                        </button>
                        {brands.map(({ brand, total }) => (
                            <button
                                key={brand}
                                onClick={() =>
                                    applyFilters({
                                        brand:
                                            filters.brand === brand
                                                ? ''
                                                : brand,
                                    })
                                }
                                className={cn(
                                    'rounded-full px-3.5 py-1.5 text-[12px] font-bold whitespace-nowrap shadow-sm transition-colors',
                                    filters.brand === brand
                                        ? 'bg-teal-600 text-white'
                                        : 'bg-white/5 text-zinc-300',
                                )}
                            >
                                {brand} · {total}
                            </button>
                        ))}
                        <span className="mx-0.5 w-px shrink-0 bg-white/10" />
                        <select
                            value={filters.max_price}
                            onChange={(e) =>
                                applyFilters({ max_price: e.target.value })
                            }
                            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] font-bold whitespace-nowrap text-zinc-200 outline-none"
                            aria-label="Maksimal harga"
                        >
                            {MAX_PRICE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* grid */}
                    {phones.data.length > 0 ? (
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
                            {phones.data.map((phone) => (
                                <PhoneCard key={phone.id} phone={phone} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] py-16 text-center">
                            <SearchX className="size-12 text-zinc-600" />
                            <div>
                                <p className="text-lg font-extrabold text-white">
                                    Tidak ada handphone ditemukan
                                </p>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Coba kata kunci lain atau reset filter.
                                </p>
                            </div>
                            <button
                                onClick={resetFilters}
                                className="rounded-full bg-teal-600 px-5 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-teal-500"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}

                    {/* pagination */}
                    {phones.last_page > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-1.5">
                            <button
                                onClick={() =>
                                    goToPage(phones.current_page - 1)
                                }
                                disabled={phones.current_page === 1}
                                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-zinc-400 transition-colors enabled:hover:bg-white/10 disabled:opacity-30"
                                aria-label="Halaman sebelumnya"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            {Array.from(
                                { length: phones.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={cn(
                                        'size-9 rounded-full text-[13px] font-bold shadow-sm transition-colors',
                                        page === phones.current_page
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-white/5 text-zinc-300 hover:bg-white/10',
                                    )}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    goToPage(phones.current_page + 1)
                                }
                                disabled={
                                    phones.current_page === phones.last_page
                                }
                                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-zinc-400 transition-colors enabled:hover:bg-white/10 disabled:opacity-30"
                                aria-label="Halaman selanjutnya"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ============ TENTANG TOKO ============ */}
            <section
                id="tentang"
                className="scroll-mt-24 border-t border-white/5 bg-[#0d1a1c]"
            >
                <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-14">
                    <div>
                        <p className="text-[11px] font-bold tracking-[0.2em] text-teal-400 uppercase">
                            Tentang Kami
                        </p>
                        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                            Tentang HellPhone
                        </h2>
                        <p className="mt-3 max-w-md text-[16px] leading-relaxed font-semibold text-zinc-300">
                            Gua jualan bukan Sedekah.
                        </p>
                        <ul className="mt-5 flex flex-wrap items-center gap-2 text-[13px] font-bold text-zinc-100">
                            <li className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2">
                                <Eye className="size-4 shrink-0 text-teal-400" />
                                Pantau
                            </li>
                            <li className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2">
                                <Check className="size-4 shrink-0 text-teal-400" />
                                Cocok
                            </li>
                            <li className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2">
                                <Banknote className="size-4 shrink-0 text-teal-400" />
                                Bayar
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                            Kunjungi Toko
                        </p>
                        <p className="mt-3 flex items-start gap-2 text-[14px] font-medium text-zinc-300">
                            <MapPin className="mt-0.5 size-5 shrink-0 text-rose-400" />
                            Jl. Jalan Sendirian Gada Yang Nemenin
                        </p>
                        <p className="mt-2 pl-7 text-[12px] font-bold text-teal-400">
                            Open 24 Jam
                        </p>
                        <a
                            href={waLink(
                                wa,
                                'Halo, Mau Tanya Handphone',
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#1fb855]"
                        >
                            Chat WhatsApp
                        </a>
                        <a
                            href={waLink(
                                wa,
                                'Halo, Mau Jual Handphone om',
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3.5 text-[14px] font-bold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <Banknote className="size-5" />
                            Jual Handphone Kamu
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
