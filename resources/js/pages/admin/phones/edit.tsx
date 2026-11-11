import { Head, Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import PhoneForm from '@/components/admin/phone-form';
import type { Phone } from '@/types';

interface Props {
    phone: Phone;
    brands: string[];
    accents: string[];
}

export default function EditPhone({ phone, brands, accents }: Props) {
    return (
        <>
            <Head title="HellPhone" />
            <div className="mx-auto w-full max-w-4xl p-4 md:p-6">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Edit Handphone
                        </h1>
                        <p className="max-w-xl truncate text-sm text-muted-foreground">
                            {phone.name}
                        </p>
                    </div>
                    <Link
                        href={`/phone/${phone.slug}`}
                        target="_blank"
                        className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-xs font-bold text-muted-foreground transition-all hover:text-foreground"
                    >
                        Lihat di Katalog
                        <ExternalLink className="size-4" />
                    </Link>
                </div>
                <PhoneForm
                    mode="edit"
                    initial={phone}
                    brands={brands}
                    accents={accents}
                />
            </div>
        </>
    );
}

EditPhone.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Katalog HP', href: '/admin/phones' },
        { title: 'Edit', href: '#' },
    ],
};
