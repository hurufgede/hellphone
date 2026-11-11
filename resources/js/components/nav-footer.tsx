import { Link, router } from '@inertiajs/react';
import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const cleanup = useMobileNavigation();

    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const handleClick = () => {
                            if (item.flushOnNavigate) {
                                router.flushAll();
                            }
                            cleanup();
                        };

                        return (
                            <SidebarMenuItem
                                key={item.title}
                                className={
                                    item.hideOnMobile
                                        ? 'max-md:hidden'
                                        : undefined
                                }
                            >
                                <SidebarMenuButton
                                    asChild
                                    className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                                >
                                    {item.method === 'post' ? (
                                        <Link
                                            href={toUrl(item.href)}
                                            as="button"
                                            method="post"
                                            className="w-full"
                                            onClick={handleClick}
                                        >
                                            {item.icon && (
                                                <item.icon className="h-5 w-5" />
                                            )}
                                            <span>{item.title}</span>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={toUrl(item.href)}
                                            prefetch
                                            onClick={handleClick}
                                        >
                                            {item.icon && (
                                                <item.icon className="h-5 w-5" />
                                            )}
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
