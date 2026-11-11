import { Head } from '@inertiajs/react';
import PhoneForm from '@/components/admin/phone-form';

interface Props {
    brands: string[];
    accents: string[];
}

export default function CreatePhone({ brands, accents }: Props) {
    return (
        <>
            <Head title="HellPhone" />
            <div className="mx-auto w-full max-w-4xl p-4 md:p-6">
                <div className="mb-5">
                    <h1 className="font-display text-2xl font-bold text-foreground">
                        Tambah Handphone
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Unit baru langsung tampil di katalog publik setelah
                        disimpan.
                    </p>
                </div>
                <PhoneForm mode="create" brands={brands} accents={accents} />
            </div>
        </>
    );
}

CreatePhone.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Katalog HP', href: '/admin/phones' },
        { title: 'Tambah', href: '/admin/phones/create' },
    ],
};
