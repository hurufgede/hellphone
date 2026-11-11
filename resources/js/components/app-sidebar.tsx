import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    PlusCircle,
    Store,
    Smartphone,
    Settings,
    LogOut,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutGrid,
    },
    {
        title: 'Katalog HP',
        href: '/admin/phones',
        icon: Smartphone,
    },
    {
        title: 'Tambah HP',
        href: '/admin/phones/create',
        icon: PlusCircle,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat Katalog Publik',
        href: '/',
        icon: Store,
    },
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Settings,
        hideOnMobile: true,
    },
    {
        title: 'Keluar',
        href: '/logout',
        icon: LogOut,
        method: 'post',
        flushOnNavigate: true,
        hideOnMobile: true,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
