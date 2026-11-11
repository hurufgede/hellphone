export function formatIDR(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatCompactIDR(value: number): string {
    if (value >= 1_000_000_000) {
        return `Rp ${(value / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} M`;
    }
    if (value >= 1_000_000) {
        return `Rp ${(value / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`;
    }

    return formatIDR(value);
}

export function shortName(name: string): string {
    return name.replace(/\s+(second|2nd)\b/gi, '').trim();
}

export function waLink(shopWa: string, message: string): string {
    return `https://wa.me/${shopWa}?text=${encodeURIComponent(message)}`;
}
