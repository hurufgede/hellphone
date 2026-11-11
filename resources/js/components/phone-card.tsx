import { Link } from '@inertiajs/react';
import { BatteryCharging } from 'lucide-react';
import PhoneArt from '@/components/phone-art';
import { formatIDR } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Phone } from '@/types';

interface PhoneCardProps {
    phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
    const isNew = phone.condition === 'new';
    const soldOut = phone.stock === 0;

    return (
        <Link
            href={`/phone/${phone.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#122022] transition-all hover:border-teal-500/30 hover:shadow-[0_0_24px_rgba(20,184,166,0.15)] focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
        >
            {/* photo */}
            <div className="relative aspect-square overflow-hidden bg-[#0B1517]">
                <PhoneArt
                    name={phone.name}
                    brand={phone.brand}
                    accent={phone.accent}
                    imageUrl={phone.image_url}
                />

                {/* condition badge */}
                <span
                    className={cn(
                        'absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-sm',
                        isNew
                            ? 'bg-emerald-400 text-emerald-950'
                            : 'bg-amber-400 text-amber-950',
                    )}
                >
                    {isNew ? 'Baru' : `2nd · Grade ${phone.grade}`}
                </span>
            </div>

            {/* body */}
            <div className="flex flex-1 flex-col gap-0.5 p-2.5">
                <p className="text-[15px] leading-snug font-bold text-white">
                    {formatIDR(phone.price)}
                </p>
                <h3 className="line-clamp-2 text-[13px] leading-snug text-zinc-300 transition-colors group-hover:text-white">
                    {phone.name}
                </h3>
                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <p className="truncate text-[11px] text-zinc-500">
                        {phone.brand} · {phone.ram}/{phone.storage}
                        {!isNew && phone.battery_health ? (
                            <span className="inline-flex items-center gap-0.5">
                                {' '}
                                ·{' '}
                                <BatteryCharging className="inline size-3 align-[-2px]" />{' '}
                                {phone.battery_health}%
                            </span>
                        ) : null}
                    </p>
                    <span
                        className={cn(
                            'shrink-0 text-[10px] font-bold',
                            soldOut
                                ? 'text-rose-400'
                                : phone.stock <= 3
                                  ? 'text-amber-400'
                                  : 'text-emerald-400',
                        )}
                    >
                        {soldOut
                            ? 'Habis'
                            : phone.stock <= 3
                              ? `Sisa ${phone.stock}`
                              : 'Ready'}
                    </span>
                </div>
            </div>
        </Link>
    );
}
