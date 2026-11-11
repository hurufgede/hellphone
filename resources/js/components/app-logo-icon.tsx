import { Phone } from 'lucide-react';

export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <span
            className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-900 text-white ${className ?? ''}`}
        >
            <Phone
                className="size-[55%]"
                strokeWidth={2.5}
                fill="currentColor"
                fillOpacity={0.25}
            />
        </span>
    );
}
