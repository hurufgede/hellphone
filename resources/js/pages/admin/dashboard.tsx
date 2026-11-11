import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Banknote,
    Flame,
    Package,
    PlusCircle,
    Recycle,
    Sparkles,
    Smartphone,
    TriangleAlert,
} from 'lucide-react';
import PhoneArt from '@/components/phone-art';
import { formatCompactIDR, formatIDR } from '@/lib/format';
import { cn } from '@/lib/utils';

interface LowStockPhone {
    id: number;
    name: string;
    brand: string;
    stock: number;
    slug: string;
    accent: string;
    condition: 'new' | 'used';
}

interface RecentPhone {
    id: number;
    name: string;
    brand: string;
    price: number;
    condition: 'new' | 'used';
    stock: number;
    accent: string;
    image_url: string | null;
    created_at: string | null;
}

interface Props {
    stats: {
        total_models: number;
        total_stock: number;
        new_models: number;
        used_models: number;
        stock_value: number;
        featured: number;
    };
    lowStock: LowStockPhone[];
    recent: RecentPhone[];
    byBrand: { brand: string; total: number }[];
}

const adminDashboard = '/admin';

export default function Dashboard({ stats, lowStock, recent, byBrand }: Props) {
    const maxBrand = Math.max(...byBrand.map((b) => b.total), 1);

    const cards = [
        {
            label: 'Total Model',
            value: stats.total_models,
            icon: Smartphone,
            tint: 'text-teal-500 bg-teal-500/10',
        },
        {
            label: 'Unit Ready',
            value: stats.total_stock,
            icon: Package,
            tint: 'text-cyan-500 bg-cyan-500/10',
        },
        {
            label: 'HP Baru',
            value: stats.new_models,
            icon: Sparkles,
            tint: 'text-emerald-500 bg-emerald-500/10',
        },
        {
            label: 'HP Second',
            value: stats.used_models,
            icon: Recycle,
            tint: 'text-amber-500 bg-amber-500/10',
        },
    ];

    return (
        <>
            <Head title="HellPhone" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                {/* header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Selamat datang, Admin
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Ringkasan stok & performa katalog HellPhone hari
                            ini.
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

                {/* stat cards */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {cards.map(({ label, value, icon: Icon, tint }) => (
                        <div
                            key={label}
                            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                        >
                            <span
                                className={cn(
                                    'inline-flex size-10 items-center justify-center rounded-xl',
                                    tint,
                                )}
                            >
                                <Icon className="size-5" />
                            </span>
                            <p className="mt-3 font-display text-2xl font-bold text-card-foreground">
                                {value}
                            </p>
                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* stock value + featured */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                    <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-950 via-[#0B201F] to-[#0d0d17] p-5 md:col-span-2">
                        <div className="pointer-events-none absolute -top-10 right-6 size-36 rounded-full bg-teal-600/25 blur-3xl" />
                        <div className="relative">
                            <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-teal-300/80 uppercase">
                                <Banknote className="size-4" /> Estimasi Nilai
                                Stok
                            </p>
                            <p className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
                                {formatIDR(stats.stock_value)}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                Total akumulasi harga × stok seluruh unit aktif
                                & tidak aktif.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-5">
                        <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-amber-500 uppercase">
                            <Flame className="size-4" /> Unit Featured
                        </p>
                        <p className="mt-2 font-display text-4xl font-bold text-amber-500">
                            {stats.featured}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                            Tampil di section “Pilihan Minggu Ini” pada katalog
                            publik.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    {/* low stock alerts */}
                    <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-card-foreground">
                                <TriangleAlert className="size-4 text-amber-500" />
                                Stok Menipis (≤ 3)
                            </h2>
                            <Link
                                href="/admin/phones"
                                className="flex items-center gap-1 text-[11px] font-bold text-teal-500 hover:text-teal-400"
                            >
                                Kelola <ArrowRight className="size-3" />
                            </Link>
                        </div>
                        <ul className="mt-3 divide-y divide-border">
                            {lowStock.length === 0 && (
                                <li className="py-6 text-center text-xs text-muted-foreground">
                                    Semua stok aman. Mantap!
                                </li>
                            )}
                            {lowStock.map((phone) => (
                                <li
                                    key={phone.id}
                                    className="flex items-center gap-3 py-2.5"
                                >
                                    <div className="size-11 shrink-0 overflow-hidden rounded-lg border border-border">
                                        <PhoneArt
                                            name={phone.name}
                                            brand={phone.brand}
                                            accent={phone.accent}
                                            showText={false}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-semibold text-card-foreground">
                                            {phone.name}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground uppercase">
                                            {phone.brand}
                                        </p>
                                    </div>
                                    <span
                                        className={cn(
                                            'rounded-full px-2 py-0.5 text-[10px] font-extrabold',
                                            phone.stock === 0
                                                ? 'bg-rose-500/15 text-rose-500'
                                                : 'bg-amber-500/15 text-amber-500',
                                        )}
                                    >
                                        {phone.stock === 0
                                            ? 'HABIS'
                                            : `${phone.stock} unit`}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* brand distribution */}
                        <h2 className="mt-5 text-sm font-bold text-card-foreground">
                            Distribusi per Brand
                        </h2>
                        <ul className="mt-2 space-y-1.5">
                            {byBrand.map(({ brand, total }) => (
                                <li
                                    key={brand}
                                    className="flex items-center gap-2 text-[11px]"
                                >
                                    <span className="w-16 truncate font-semibold text-muted-foreground">
                                        {brand}
                                    </span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                                            style={{
                                                width: `${(total / maxBrand) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="w-6 text-right font-bold text-card-foreground">
                                        {total}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* recent phones */}
                    <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-card-foreground">
                                Baru Ditambahkan
                            </h2>
                            <Link
                                href="/admin/phones"
                                className="flex items-center gap-1 text-[11px] font-bold text-teal-500 hover:text-teal-400"
                            >
                                Lihat semua <ArrowRight className="size-3" />
                            </Link>
                        </div>
                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-border text-[10px] tracking-widest text-muted-foreground uppercase">
                                        <th className="pb-2 font-bold">Unit</th>
                                        <th className="pb-2 font-bold">
                                            Kondisi
                                        </th>
                                        <th className="pb-2 text-right font-bold">
                                            Harga
                                        </th>
                                        <th className="pb-2 text-right font-bold">
                                            Stok
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recent.map((phone) => (
                                        <tr key={phone.id}>
                                            <td className="py-2.5 pr-2">
                                                <Link
                                                    href={`/admin/phones/${phone.id}/edit`}
                                                    className="font-semibold text-card-foreground hover:text-teal-500"
                                                >
                                                    {phone.name}
                                                </Link>
                                                <p className="text-[10px] text-muted-foreground uppercase">
                                                    {phone.brand}
                                                </p>
                                            </td>
                                            <td className="py-2.5">
                                                <span
                                                    className={cn(
                                                        'rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase',
                                                        phone.condition ===
                                                            'new'
                                                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
                                                    )}
                                                >
                                                    {phone.condition === 'new'
                                                        ? 'Baru'
                                                        : 'Second'}
                                                </span>
                                            </td>
                                            <td className="py-2.5 text-right font-bold whitespace-nowrap text-card-foreground">
                                                {formatCompactIDR(phone.price)}
                                            </td>
                                            <td className="py-2.5 text-right text-muted-foreground">
                                                {phone.stock}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: adminDashboard }],
};
