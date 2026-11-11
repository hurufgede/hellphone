export interface Phone {
    id: number;
    name: string;
    slug: string;
    brand: string;
    price: number;
    compare_price: number | null;
    discount: number | null;
    condition: 'new' | 'used';
    grade: 'A' | 'B' | 'C' | null;
    ram: string;
    storage: string;
    battery_health: number | null;
    color: string | null;
    stock: number;
    description: string | null;
    image_url: string | null;
    accent: AccentKey;
    is_featured: boolean;
    is_active?: boolean;
    created_at: string | null;
}

export type AccentKey =
    | 'violet'
    | 'cyan'
    | 'amber'
    | 'rose'
    | 'emerald'
    | 'sky'
    | 'fuchsia'
    | 'lime';

export interface BrandCount {
    brand: string;
    total: number;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: { url: string | null; label: string; active: boolean }[];
}
