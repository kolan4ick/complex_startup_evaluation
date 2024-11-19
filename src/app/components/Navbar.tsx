'use client';

import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUser, setToken } from '@/lib/features/users/usersSlice';
import { useLocale, useTranslations } from 'use-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/app/providers/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const user = useAppSelector((state) => state.auth.user);
    const { theme, toggleTheme } = useTheme();

    // Client-side only state to prevent hydration issues
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const mainLink = user ? `/${locale}` : `/${locale}/login`;

    const authLink = useMemo(() => {
        if (!isMounted) return null;

        if (pathname === `/${locale}/login`) {
            return (
                <Link
                    href={`/${locale}/register`}
                    className="hover:text-blue-500 dark:hover:text-gray-400"
                >
                    {t('links.register')}
                </Link>
            );
        }
        return (
            <Link
                href={`/${locale}/login`}
                className="hover:text-blue-500 dark:hover:text-gray-400"
            >
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

    if (!isMounted) {
        return <nav className="bg-white text-black p-4"></nav>;
    }

    return (
        <nav className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
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
                    <li>
                        <button
                            onClick={toggleTheme}
                            className="relative flex items-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300"
                        >
                            <span
                                className={`absolute flex items-center justify-center h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            >
                                {theme === 'dark' ? (
                                    <MoonIcon className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <SunIcon className="h-4 w-4 text-gray-600" />
                                )}
                            </span>
                        </button>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className="hover:text-blue-500 dark:hover:text-gray-400"
                                >
                                    {t('links.home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/profile`}
                                    className="hover:text-blue-500 dark:hover:text-gray-400"
                                >
                                    {t('links.profile')}
                                </Link>
                            </li>
                            <li className="text-sm">{`${t('welcome')}, ${user.name}`}</li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    aria-label="Logout"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
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
