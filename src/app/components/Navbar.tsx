'use client';

import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUser, setToken } from '@/lib/features/users/usersSlice';
import { useLocale, useTranslations } from 'use-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const user = useAppSelector((state) => state.auth.user);

    // Client-side only state to prevent hydration issues
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Determine the main link based on authentication status
    const mainLink = user ? `/${locale}` : `/${locale}/login`;

    const authLink = useMemo(() => {
        if (!isMounted) return null;

        if (pathname === `/${locale}/login`) {
            return (
                <Link href={`/${locale}/register`} className="hover:text-blue-400">
                    {t('links.register')}
                </Link>
            );
        }
        return (
            <Link href={`/${locale}/login`} className="hover:text-blue-400">
                {t('links.login')}
            </Link>
        );
    }, [pathname, locale, t, isMounted]);

    const handleLogout = async () => {
        try {
            dispatch(setUser(null));
            dispatch(setToken(null));
            document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            router.push(`/${locale}/login`);
        } catch (error) {
            console.error('Logout failed:', error);
            alert(t('errors.logoutFailed'));
        }
    };

    // Defer rendering of user-specific content until after hydration
    if (!isMounted) {
        return <nav className="bg-white text-black p-4"></nav>;
    }

    return (
        <nav className="bg-white border-2 text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Main logo link updated based on authentication status */}
                <Link href={mainLink} className="flex items-center space-x-2">
                    <Image
                        src="/favicon.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        priority
                        className="h-8 w-8"
                    />
                    <span className="text-xl font-bold">{t('brandName')}</span>
                </Link>
                <ul className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <li>
                                <Link href={`/${locale}`} className="hover:text-blue-400">
                                    {t('links.home')}
                                </Link>
                            </li>
                            <li className="text-sm">{`${t('welcome')}, ${user.name}`}</li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    aria-label="Logout"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    {t('buttons.logout')}
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>{authLink}</li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
