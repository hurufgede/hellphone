import type { AccentKey } from '@/types';

export interface AccentTheme {
    a: string;
    b: string;
    deep: string;
    glow: string;
    text: string;
    label: string;
}

export const ACCENTS: Record<AccentKey, AccentTheme> = {
    violet: {
        a: '#a78bfa',
        b: '#7c3aed',
        deep: '#1e1033',
        glow: 'rgba(167,139,250,0.55)',
        text: '#ddd6fe',
        label: 'Violet',
    },
    cyan: {
        a: '#67e8f9',
        b: '#0891b2',
        deep: '#082a33',
        glow: 'rgba(103,232,249,0.5)',
        text: '#cffafe',
        label: 'Cyan',
    },
    amber: {
        a: '#fcd34d',
        b: '#d97706',
        deep: '#33230a',
        glow: 'rgba(252,211,77,0.5)',
        text: '#fef3c7',
        label: 'Amber',
    },
    rose: {
        a: '#fda4af',
        b: '#e11d48',
        deep: '#330a18',
        glow: 'rgba(253,164,175,0.5)',
        text: '#ffe4e6',
        label: 'Rose',
    },
    emerald: {
        a: '#6ee7b7',
        b: '#059669',
        deep: '#062a1f',
        glow: 'rgba(110,231,183,0.5)',
        text: '#d1fae5',
        label: 'Emerald',
    },
    sky: {
        a: '#7dd3fc',
        b: '#0284c7',
        deep: '#082338',
        glow: 'rgba(125,211,252,0.5)',
        text: '#e0f2fe',
        label: 'Sky',
    },
    fuchsia: {
        a: '#f0abfc',
        b: '#c026d3',
        deep: '#2f0a33',
        glow: 'rgba(240,171,252,0.5)',
        text: '#fae8ff',
        label: 'Fuchsia',
    },
    lime: {
        a: '#bef264',
        b: '#65a30d',
        deep: '#1f330a',
        glow: 'rgba(190,242,100,0.5)',
        text: '#ecfccb',
        label: 'Lime',
    },
};

export const ACCENT_KEYS = Object.keys(ACCENTS) as AccentKey[];

export function accentOf(key: string | null | undefined): AccentTheme {
    return ACCENTS[(key as AccentKey) ?? 'violet'] ?? ACCENTS.violet;
}
