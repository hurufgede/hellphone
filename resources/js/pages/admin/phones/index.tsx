import { Head, Link, router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Pencil,
    PlusCircle,
    Search,
    Smartphone,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PhoneArt from '@/components/phone-art';
import { formatIDR } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { BrandCount, Paginated, Phone } from '@/types';

interface Filters {
    q: string;
    brand: string;
    condition: string;
}

interface Props {
    phones: Paginated<Phone>;
    brands: BrandCount[];
    filters: Filters;
}

export default function PhonesIndex({ phones, brands, filters }: Props) {
    const [search, setSearch] = useState(filters.q);
    const [phoneToDelete, setPhoneToDelete] = useState<Phone | null>(null);
    const [deleting, setDeleting] = useState(false);

    const applyFilters = (next: Partial<Filters>) => {
        const params = { ...filters, ...next };
        const query: Record<string, string> = {};
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                query[key] = value;
            }
        }
        router.get('/admin/phones', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
        if (search === filters.q) {
            return;
        }
        const timeout = window.setTimeout(
            () => applyFilters({ q: search }),
            350,
        );
        return () => window.clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const goToPage = (page: number) => {
        const query: Record<string, string> = {};
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                query[key] = value;
            }
        }
        query.page = String(page);
        router.get('/admin/phones', query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const confirmDelete = () => {
        if (!phoneToDelete) {
            return;
        }
        setDeleting(true);
        router.delete(`/admin/phones/${phoneToDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setDeleting(false);
                setPhoneToDelete(null);
            },
        });
    };

    return (
        <>
            <Head title="HellPhone" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                {/* header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Kelola Handphone
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {phones.total} model terdaftar di katalog.
                        </p>
                    </div>
                    <Link
                        href="/admin/phones/create"
                        className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-500"
                    >
                        <PlusCircle className="size-4" />
                        Tambah HP
                    </Link>
                </div>

                {/* filter bar */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <label className="relative flex-1">
                        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, brand, RAM, storage..."
                            className="h-11 w-full rounded-xl border border-input bg-background pr-4 pl-10 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/25"
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:flex">
                        <select
                            value={filters.brand}
                            onChange={(e) =>
                                applyFilters({ brand: e.target.value })
                            }
                            className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-sm font-semibold outline-none focus:border-teal-500 md:w-auto"
                            aria-label="Filter brand"
                        >
                            <option value="">Semua Brand</option>
                            {brands.map(({ brand }) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filters.condition}
                            onChange={(e) =>
                                applyFilters({ condition: e.target.value })
                            }
                            className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3 text-sm font-semibold outline-none focus:border-teal-500 md:w-auto"
                            aria-label="Filter kondisi"
                        >
                            <option value="">Baru & Second</option>
                            <option value="new">Baru</option>
                            <option value="used">Second</option>
                        </select>
                    </div>
                </div>

                {/* table */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/40 text-[10px] tracking-widest text-muted-foreground uppercase">
                                    <th className="px-4 py-3 font-bold">
                                        Unit
                                    </th>
                                    <th className="px-4 py-3 font-bold">
                                        Kondisi
                                    </th>
                                    <th className="px-4 py-3 text-right font-bold">
                                        Harga
                                    </th>
                                    <th className="px-4 py-3 text-center font-bold">
                                        Stok
                                    </th>
                                    <th className="px-4 py-3 text-center font-bold">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right font-bold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {phones.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-12 text-center"
                                        >
                                            <Smartphone className="mx-auto size-8 text-muted-foreground" />
                                            <p className="mt-2 text-sm font-semibold text-muted-foreground">
                                                Tidak ada handphone ditemukan.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                                {phones.data.map((phone) => (
                                    <tr
                                        key={phone.id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-12 shrink-0 overflow-hidden rounded-xl border border-border">
                                                    <PhoneArt
                                                        name={phone.name}
                                                        brand={phone.brand}
                                                        accent={phone.accent}
                                                        imageUrl={
                                                            phone.image_url
                                                        }
                                                        showText={false}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p
                                                        className="max-w-[220px] truncate font-semibold text-card-foreground"
                                                        title={phone.name}
                                                    >
                                                        {phone.name}
                                                    </p>
                                                    <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                        {phone.brand} ·{' '}
                                                        {phone.ram}/
                                                        {phone.storage}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <span
                                                className={cn(
                                                    'rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase',
                                                    phone.condition === 'new'
                                                        ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-amber-500/12 text-amber-600 dark:text-amber-400',
                                                )}
                                            >
                                                {phone.condition === 'new'
                                                    ? 'Baru'
                                                    : `Second ${phone.grade ?? ''}`}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2.5 text-right font-bold whitespace-nowrap text-card-foreground">
                                            {formatIDR(phone.price)}
                                            {phone.compare_price && (
                                                <span className="block text-[10px] font-normal text-muted-foreground line-through">
                                                    {formatIDR(
                                                        phone.compare_price,
                                                    )}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2.5 text-center">
                                            <span
                                                className={cn(
                                                    'inline-block min-w-8 rounded-full px-2 py-0.5 text-[11px] font-extrabold',
                                                    phone.stock === 0
                                                        ? 'bg-rose-500/15 text-rose-500'
                                                        : phone.stock <= 3
                                                          ? 'bg-amber-500/15 text-amber-500'
                                                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
                                                )}
                                            >
                                                {phone.stock}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2.5 text-center">
                                            {phone.is_active ? (
                                                <Eye className="mx-auto size-4 text-emerald-500" />
                                            ) : (
                                                <EyeOff className="mx-auto size-4 text-muted-foreground" />
                                            )}
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={`/admin/phones/${phone.id}/edit`}
                                                    className="rounded-lg border border-border p-2 text-muted-foreground transition-all hover:border-teal-500 hover:text-teal-500"
                                                    aria-label="Edit handphone"
                                                >
                                                    <Pencil className="size-4" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        setPhoneToDelete(phone)
                                                    }
                                                    className="rounded-lg border border-border p-2 text-muted-foreground transition-all hover:border-rose-500 hover:text-rose-500"
                                                    aria-label="Hapus handphone"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* pagination */}
                    {phones.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-border px-4 py-3">
                            <p className="text-[11px] font-semibold text-muted-foreground">
                                Hal {phones.current_page} dari{' '}
                                {phones.last_page}
                            </p>
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() =>
                                        goToPage(phones.current_page - 1)
                                    }
                                    disabled={phones.current_page === 1}
                                    className="rounded-lg border border-border p-2 text-muted-foreground enabled:hover:text-foreground disabled:opacity-30"
                                    aria-label="Sebelumnya"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                                <button
                                    onClick={() =>
                                        goToPage(phones.current_page + 1)
                                    }
                                    disabled={
                                        phones.current_page === phones.last_page
                                    }
                                    className="rounded-lg border border-border p-2 text-muted-foreground enabled:hover:text-foreground disabled:opacity-30"
                                    aria-label="Selanjutnya"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== Delete confirmation modal ===== */}
            {phoneToDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onClick={() => !deleting && setPhoneToDelete(null)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/10">
                                <Trash2 className="size-6 text-rose-500" />
                            </div>
                            <button
                                onClick={() => setPhoneToDelete(null)}
                                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                                aria-label="Tutup"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <h2 className="mt-4 font-display text-lg font-bold text-card-foreground">
                            Hapus handphone ini?
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">
                                {phoneToDelete.name}
                            </span>{' '}
                            akan dihapus permanen dari katalog. Tindakan ini
                            tidak bisa dibatalkan.
                        </p>
                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={() => setPhoneToDelete(null)}
                                disabled={deleting}
                                className="rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-rose-500 disabled:opacity-50"
                            >
                                {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

PhonesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Katalog HP', href: '/admin/phones' },
    ],
};
