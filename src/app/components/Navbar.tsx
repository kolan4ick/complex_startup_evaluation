'use client';

import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { clearAuth } from '@/lib/features/users/usersSlice';
import { useLocale, useTranslations } from 'use-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/app/providers/ThemeProvider';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import ProfileIcon from '@/app/components/Icons/ProfileIcon';
import LogoutIcon from '@/app/components/Icons/LogoutIcon';
import HomeIcon from '@/app/components/Icons/HomeIcon';
import LocaleSwitcher from '@/app/components/LocaleSwitcher';
import EvaluationsIcon from '@/app/components/Icons/EvaluationsIcon';
import { useCookies } from 'next-client-cookies';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const dispatch = useAppDispatch();
    const cookies = useCookies();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const user = useAppSelector((state) => state.auth.user);
    const { theme, toggleTheme } = useTheme();

    const [isMounted, setIsMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const authLink = useMemo(() => {
        if (!isMounted) return null;

        if (pathname === `/${locale}/login`) {
            return (
                <Link href={`/${locale}/register`} className="hover:text-blue-500 dark:hover:text-gray-400">
                    {t('links.register')}
                </Link>
            );
        }
        return (
            <Link href={`/${locale}/login`} className="hover:text-blue-500 dark:hover:text-gray-400">
                {t('links.login')}
            </Link>
        );
    }, [pathname, locale, t, isMounted]);

    const handleLogout = async () => {
        try {
            cookies.remove('auth-token');
            router.push(`/${locale}/login`);
            dispatch(clearAuth());
            setMenuOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
            alert(t('errors.logoutFailed'));
        }
    };

    if (!isMounted) {
        return <nav className="bg-white text-black p-4"></nav>;
    }

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
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
                <button
                    className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {menuOpen ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                </button>
                <div className="hidden sm:flex items-center space-x-4">
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
                    <LocaleSwitcher />
                    {user ? (
                        <>
                            <Link
                                href={`/${locale}`}
                                className="p-2 flex items-center text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <HomeIcon />
                            </Link>
                            <Link
                                href={`/${locale}/evaluations`}
                                className="p-2 flex items-center text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <EvaluationsIcon />
                            </Link>
                            <Link
                                href={`/${locale}/profile`}
                                className="p-2 flex items-center text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <ProfileIcon />
                            </Link>
                            <button
                                onClick={handleLogout}
                                aria-label="Logout"
                                className="p-2 flex items-center text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <LogoutIcon />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center">{authLink}</div>
                    )}
                </div>
            </div>
            {menuOpen && (
                <div className="sm:hidden mt-4">
                    <ul className="flex flex-col space-y-2 items-center">
                        <li>
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setMenuOpen(false);
                                }}
                                className="flex items-center p-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {theme === 'dark' ? (
                                    <MoonIcon className="h-6 w-6 mr-2" />
                                ) : (
                                    <SunIcon className="h-6 w-6 mr-2" />
                                )}
                                <span>{t('toggleTheme')}</span>
                            </button>
                        </li>
                        <li>
                            <LocaleSwitcher />
                        </li>
                        {user ? (
                            <>
                                <li className="flex">
                                    <Link
                                        href={`/${locale}`}
                                        className="flex gap-2 items-center p-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <HomeIcon />
                                        <span>{t('links.home')}</span>
                                    </Link>
                                </li>
                                <li className="flex">
                                    <Link
                                        href={`/${locale}/evaluations`}
                                        className="flex items-center gap-2 p-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <EvaluationsIcon />
                                        <span>{t('links.evaluations')}</span>
                                    </Link>
                                </li>
                                <li className="flex">
                                    <Link
                                        href={`/${locale}/profile`}
                                        className="flex items-center p-2 gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <ProfileIcon />
                                        <span>{t('links.profile')}</span>
                                    </Link>
                                </li>
                                <li className="flex">
                                    <button
                                        onClick={() => {
                                            handleLogout().then(() => setMenuOpen(false))
                                        }}
                                        aria-label="Logout"
                                        className="flex gap-2 items-center p-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <LogoutIcon />
                                        <span>{t('links.logout')}</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="flex items-center p-2">
                                <Link
                                    href={`/${locale}/login`}
                                    className="hover:text-blue-500 dark:hover:text-gray-400"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t('links.login')}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
