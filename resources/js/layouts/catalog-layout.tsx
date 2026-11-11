import { Link, router, usePage } from '@inertiajs/react';
import { LayoutDashboard, Lock, Menu, Search, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { waLink } from '@/lib/format';

export default function CatalogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth, shopWa, filters } = usePage().props as unknown as {
        auth: { user: { id: number; name: string } | null };
        shopWa?: string;
        filters?: { q?: string };
    };
    const [open, setOpen] = useState(false);
    const wa = shopWa ?? '6285717681598';

    const [q, setQ] = useState(filters?.q ?? '');

    useEffect(() => {
        setQ(filters?.q ?? '');
    }, [filters?.q]);

    const submitSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/', q ? { q } : {}, { preserveScroll: false });
    };

    const searchBox = (
        <form onSubmit={submitSearch} role="search" className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-teal-500" />
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari di Marketplace HellPhone"
                aria-label="Cari handphone"
                className="h-10 w-full rounded-full border border-white/10 bg-white/5 pr-4 pl-11 text-[15px] text-zinc-100 placeholder-zinc-500 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
        </form>
    );

    return (
        <div className="min-h-screen overflow-x-clip bg-[#0B1517] font-sans text-zinc-200 antialiased">
            {/* ===== Top navbar ===== */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B1517]/85 backdrop-blur-xl">
                <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-3 sm:h-16 sm:px-4">
                    {/* logo */}
                    <Link href="/" className="shrink-0">
                        <span className="text-[20px] font-extrabold tracking-tight text-white sm:text-[22px]">
                            Hell<span className="text-teal-400">Phone</span>
                        </span>
                    </Link>

                    {/* search center */}
                    <div className="mx-auto hidden w-full max-w-xl sm:block">
                        {searchBox}
                    </div>

                    <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:ml-0 sm:gap-2">
                        {auth?.user ? (
                            <Link
                                href="/admin"
                                aria-label="Dashboard admin"
                                title="Dashboard"
                                className="flex size-9 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 transition-colors hover:bg-teal-500/20 sm:size-10"
                            >
                                <LayoutDashboard className="size-5" />
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                aria-label="Login admin"
                                title="Login admin"
                                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white sm:size-10"
                            >
                                <Lock className="size-5" />
                            </Link>
                        )}

                        {/* mobile toggle */}
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 md:hidden"
                            aria-label="Menu"
                        >
                            {open ? (
                                <X className="size-5" />
                            ) : (
                                <Menu className="size-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* mobile search */}
                <div className="border-t border-white/5 px-3 py-2 sm:hidden">
                    {searchBox}
                </div>

                {/* mobile menu */}
                {open && (
                    <div className="border-t border-white/5 bg-[#0d1a1c]/95 backdrop-blur-xl md:hidden">
                        <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-3 py-3 text-[15px] font-semibold text-zinc-300">
                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white"
                            >
                                Marketplace
                            </Link>
                            <a
                                href="/#tentang"
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white"
                            >
                                Tentang Toko
                            </a>
                            <a
                                href={waLink(
                                    wa,
                                    'Halo, Mau Tanya Handphone',
                                )}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg bg-teal-500/15 px-3 py-2.5 font-bold text-teal-300"
                            >
                                Chat WhatsApp
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            {/* ===== Page content ===== */}
            <main>{children}</main>

            {/* ===== Footer ===== */}
            <footer className="border-t border-white/5 bg-[#0d1a1c]">
                <div className="mx-auto max-w-[1440px] px-4 py-5 text-center">
                    <p className="text-[13px] font-extrabold text-white">
                        HellPhone
                    </p>
                </div>
            </footer>

            {/* ===== WhatsApp floating button ===== */}
            <a
                href={waLink(wa, 'Halo, Mau Tanya Handphone')}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat WhatsApp"
                className="fixed right-4 bottom-5 z-50 flex size-13 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-white"
                >
                    <path d="M17.472 14.382c-0.297-0.149-1.758-0.867-2.03-0.967-0.273-0.099-0.471-0.148-0.67 0.15-0.197 0.297-0.767 0.966-0.94 1.164-0.173 0.199-0.347 0.223-0.644 0.075-0.297-0.15-1.255-0.463-2.39-1.475-0.883-0.788-1.48-1.761-1.653-2.059-0.173-0.297-0.018-0.458 0.13-0.606 0.134-0.133 0.297-0.347 0.446-0.52 0.149-0.174 0.198-0.298 0.297-0.497 0.1-0.198 0.05-0.371-0.025-0.52-0.074-0.149-0.669-1.612-0.916-2.207-0.242-0.579-0.487-0.5-0.669-0.51-0.173-0.008-0.371-0.01-0.57-0.01-0.198 0-0.52 0.074-0.792 0.371-0.272 0.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074 0.149 0.198 2.096 3.2 5.077 4.487 0.709 0.306 1.262 0.49 1.694 0.627 0.712 0.226 1.36 0.194 1.871 0.118 0.571-0.085 1.758-0.718 2.006-1.41 0.248-0.694 0.248-1.289 0.173-1.41-0.074-0.124-0.272-0.198-0.57-0.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.855L.057 23.428a.75.75 0 0 0 .915.915l5.573-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.52-5.228-1.421l-.374-.224-3.875 1.022 1.022-3.875-.224-.374A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
            </a>
        </div>
    );
}
