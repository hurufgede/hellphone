import { Head, Link, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    BatteryCharging,
    ChevronRight,
    Cpu,
    HardDrive,
    Maximize2,
    MessageCircle,
    Palette,
    ShieldCheck,
    Smartphone,
    Truck,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import PhoneArt from '@/components/phone-art';
import PhoneCard from '@/components/phone-card';
import { formatIDR, waLink } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Phone } from '@/types';

interface Props {
    phone: Phone;
    similar: Phone[];
}

export default function PhonePage({ phone, similar }: Props) {
    const { shopWa } = usePage().props as unknown as { shopWa?: string };
    const wa = shopWa ?? '6285717681598';

    const isNew = phone.condition === 'new';
    const waMessage = `Halo HellPhone! Saya tertarik dengan *${phone.name}* seharga ${formatIDR(phone.price)}. Apakah masih ready?`;
    const waHref = waLink(wa, waMessage);
    const soldOut = phone.stock === 0;
    const [lightbox, setLightbox] = useState(false);

    useEffect(() => {
        if (!lightbox) {
            return;
        }
        const onKey = (e: KeyboardEvent) =>
            e.key === 'Escape' && setLightbox(false);
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightbox]);

    const specs: { icon: typeof Cpu; label: string; value: string }[] = [
        { icon: Cpu, label: 'RAM', value: phone.ram },
        { icon: HardDrive, label: 'Storage', value: phone.storage },
        { icon: Palette, label: 'Warna', value: phone.color ?? '—' },
        isNew
            ? { icon: BatteryCharging, label: 'Baterai', value: '100% Baru' }
            : {
                  icon: BatteryCharging,
                  label: 'Battery Health',
                  value: `${phone.battery_health ?? '-'}%`,
              },
        {
            icon: ShieldCheck,
            label: 'Kondisi',
            value: isNew ? 'Baru · SEAL' : `Second · Grade ${phone.grade}`,
        },
        {
            icon: BadgeCheck,
            label: 'Garansi',
            value: isNew
                ? 'Resmi / Distributor 1 Tahun'
                : 'Garansi Toko 1 Bulan',
        },
    ];

    return (
        <>
            <Head title="HellPhone" />

            <div className="mx-auto max-w-[1440px] px-3 pt-3 pb-28 sm:px-4 sm:pt-5 lg:pb-10">
                {/* breadcrumb */}
                <nav className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-zinc-500">
                    <Link
                        href="/"
                        className="transition-colors hover:text-white hover:underline"
                    >
                        Marketplace
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <Link
                        href="/"
                        className="transition-colors hover:text-white hover:underline"
                    >
                        Katalog
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <span className="max-w-[16rem] truncate font-semibold text-zinc-200">
                        {phone.name}
                    </span>
                </nav>

                <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-12">
                    {/* ===== Foto panel ===== */}
                    <div className="lg:col-span-5">
                        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#122022]">
                            <button
                                type="button"
                                onClick={() => setLightbox(true)}
                                aria-label="Lihat foto produk"
                                className="group relative block w-full cursor-zoom-in"
                            >
                                <div className="aspect-square sm:aspect-[4/3.4] lg:aspect-square">
                                    <PhoneArt
                                        name={phone.name}
                                        brand={phone.brand}
                                        accent={phone.accent}
                                        imageUrl={phone.image_url}
                                    />
                                </div>
                                <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur transition-opacity group-hover:bg-black/70">
                                    <Maximize2 className="size-3.5" />
                                    Perbesar
                                </span>
                            </button>
                            <span
                                className={cn(
                                    'pointer-events-none absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase shadow-sm',
                                    isNew
                                        ? 'bg-emerald-400 text-white'
                                        : 'bg-amber-400 text-amber-950',
                                )}
                            >
                                {isNew
                                    ? 'Baru · SEAL'
                                    : `Second · Grade ${phone.grade}`}
                            </span>
                        </div>

                        {/* trust badges */}
                        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                            {[
                                [ShieldCheck, 'Bergaransi'],
                                [BadgeCheck, 'Dicek 43 Titik'],
                                [Truck, 'COD / Kirim'],
                            ].map(([Icon, label], i) => {
                                const IconCmp = Icon as typeof ShieldCheck;
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.03] px-2 py-3"
                                    >
                                        <IconCmp className="size-5 text-teal-400" />
                                        <p className="text-[10px] font-bold tracking-wide text-zinc-500 uppercase">
                                            {label as string}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ===== Info panel ===== */}
                    <div className="flex flex-col lg:col-span-7">
                        <div className="rounded-2xl border border-white/8 bg-[#122022] p-4 sm:p-6">
                            <p className="text-[11px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                {phone.brand}
                            </p>
                            <h1 className="mt-1 text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-3xl">
                                {phone.name}
                            </h1>

                            {/* price block */}
                            <div className="mt-4">
                                <div className="flex flex-wrap items-end gap-x-4 gap-y-1.5">
                                    <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        {formatIDR(phone.price)}
                                    </p>
                                    {phone.compare_price &&
                                        phone.compare_price > phone.price && (
                                            <p className="pb-1 text-base text-zinc-600 line-through">
                                                {formatIDR(phone.compare_price)}
                                            </p>
                                        )}
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                                    <span
                                        className={cn(
                                            'flex items-center gap-1.5 rounded-full px-3 py-1',
                                            soldOut
                                                ? 'bg-rose-500/15 text-rose-400'
                                                : phone.stock <= 3
                                                  ? 'bg-amber-500/15 text-amber-400'
                                                  : 'bg-emerald-500/15 text-emerald-400',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'size-1.5 rounded-full',
                                                soldOut
                                                    ? 'bg-[#E41E3F]'
                                                    : phone.stock <= 3
                                                      ? 'bg-[#F7B928]'
                                                      : 'bg-emerald-400',
                                            )}
                                        />
                                        {soldOut
                                            ? 'Stok habis'
                                            : `Stok tersisa ${phone.stock} unit`}
                                    </span>
                                </div>
                            </div>

                            {/* CTAs (desktop) */}
                            <div className="mt-5 hidden flex-wrap gap-2 lg:flex">
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#1fb855]"
                                >
                                    <MessageCircle className="size-5" />
                                    Tanya via WhatsApp
                                </a>
                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[14px] font-bold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <Smartphone className="size-5" />
                                    Lihat HP Lain
                                </Link>
                            </div>
                        </div>

                        {/* spec grid */}
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {specs.map(({ icon: Icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3"
                                >
                                    <Icon className="size-5 shrink-0 text-teal-400" />
                                    <span className="min-w-0">
                                        <span className="block text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                                            {label}
                                        </span>
                                        <span
                                            className="block truncate text-[12px] font-bold text-zinc-100"
                                            title={value}
                                        >
                                            {value}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* description */}
                        {phone.description && (
                            <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:p-5">
                                <p className="text-[11px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
                                    Deskripsi Unit
                                </p>
                                <p className="mt-2 text-[14px] leading-relaxed whitespace-pre-line text-zinc-300">
                                    {phone.description}
                                </p>
                                {!isNew && (
                                    <p className="mt-2 text-[10px] text-zinc-600 italic">
                                        * Minus pemakaian & kondisi fisik
                                        dikonfirmasi ulang via chat sebelum
                                        transaksi.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== Similar products ===== */}
                {similar.length > 0 && (
                    <div className="mt-8">
                        <p className="text-[16px] font-extrabold text-white">
                            {phone.brand} Lainnya
                        </p>
                        <div className="no-scrollbar -mx-3 mt-2 flex snap-x gap-2 overflow-x-auto px-3 pb-2 sm:-mx-4 sm:px-4">
                            {similar.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-44 shrink-0 snap-start sm:w-56"
                                >
                                    <PhoneCard phone={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ===== Lightbox / galeri foto ===== */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Foto ${phone.name}`}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={() => setLightbox(false)}
                >
                    <button
                        type="button"
                        onClick={() => setLightbox(false)}
                        aria-label="Tutup galeri"
                        className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                        <X className="size-6" />
                    </button>
                    <p className="pointer-events-none absolute bottom-5 left-1/2 w-full -translate-x-1/2 px-6 text-center text-[12px] font-semibold text-white/70">
                        {phone.name}
                    </p>
                    <div
                        className="flex h-full w-full items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {phone.image_url ? (
                            <img
                                src={phone.image_url}
                                alt={phone.name}
                                className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain"
                            />
                        ) : (
                            <div className="h-[80vh] w-[92vw] max-w-3xl overflow-hidden rounded-2xl">
                                <PhoneArt
                                    name={phone.name}
                                    brand={phone.brand}
                                    accent={phone.accent}
                                    className="h-full w-full"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ===== Sticky mobile CTA ===== */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d1a1c]/90 p-3 backdrop-blur-xl lg:hidden">
                <div className="mx-auto flex max-w-[1440px] items-center gap-3">
                    <div className="min-w-0">
                        <p className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                            Harga
                        </p>
                        <p className="truncate text-base leading-tight font-extrabold text-white">
                            {formatIDR(phone.price)}
                        </p>
                    </div>
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-[12px] font-bold text-white"
                    >
                        <MessageCircle className="size-4" />
                        Tanya Stok
                    </a>
                </div>
            </div>
        </>
    );
}
