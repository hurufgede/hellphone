import { accentOf } from '@/lib/accents';
import { cn } from '@/lib/utils';

interface PhoneArtProps {
    name: string;
    brand: string;
    accent: string;
    imageUrl?: string | null;
    className?: string;
    showText?: boolean;
}

/**
 * Ilustrasi handphone generatif — flat, tenang, tanpa animasi.
 */
export default function PhoneArt({
    name,
    brand,
    accent,
    imageUrl,
    className,
    showText = true,
}: PhoneArtProps) {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={name}
                loading="lazy"
                className={cn('h-full w-full object-cover', className)}
            />
        );
    }

    const theme = accentOf(accent);
    const model = name
        .replace(/\b(second|2nd)\b/gi, '')
        .replace(new RegExp(`^${brand}\\s*`, 'i'), '')
        .trim();

    return (
        <div
            className={cn(
                'relative flex h-full w-full items-center justify-center overflow-hidden',
                className,
            )}
            style={{
                background: `radial-gradient(120% 90% at 50% 0%, ${theme.deep} 0%, #0d0d16 80%)`,
            }}
            aria-label={`${brand} ${model}`}
            role="img"
        >
            {/* phone body */}
            <div className="relative z-10 flex aspect-[9/18.5] h-[78%] flex-col items-center rounded-[1.6rem] border border-white/15 bg-white/5 p-[3px]">
                <div
                    className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[1.4rem]"
                    style={{
                        background: `linear-gradient(165deg, ${theme.a} 0%, ${theme.b} 60%, ${theme.deep} 135%)`,
                    }}
                >
                    {/* dynamic island */}
                    <div className="mt-2 flex h-4 w-16 items-center justify-center rounded-full bg-black/85">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    </div>

                    {/* screen content */}
                    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2 text-center">
                        <span
                            className="text-[8px] font-semibold tracking-[0.35em] uppercase"
                            style={{ color: 'rgba(255,255,255,0.85)' }}
                        >
                            {brand}
                        </span>
                        <span className="text-center font-display text-[13px] leading-tight font-bold text-white">
                            {model.split(' ').slice(0, 2).join(' ')}
                        </span>
                    </div>

                    {/* home indicator */}
                    <div className="mb-2 h-1 w-16 rounded-full bg-white/70" />
                </div>
            </div>

            {showText && (
                <span className="pointer-events-none absolute bottom-2 left-3 text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                    HellPhone
                </span>
            )}
        </div>
    );
}
