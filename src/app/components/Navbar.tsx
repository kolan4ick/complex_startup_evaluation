'use client';

import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {clearAuth} from '@/lib/features/users/usersSlice';
import { useLocale, useTranslations } from 'use-intl';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/app/providers/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import ProfileIcon from "@/app/components/Icons/ProfileIcon";
import LogoutIcon from "@/app/components/Icons/LogoutIcon";
import HomeIcon from "@/app/components/Icons/HomeIcon";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";
import EvaluationsIcon from "@/app/components/Icons/EvaluationsIcon";
import {useCookies} from "next-client-cookies";

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
            cookies.remove('auth-token');

            router.push(`/${locale}/login`);
            dispatch(clearAuth());
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
            <div className="container mx-auto flex justify-between items-center">
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
                <ul className="flex items-center space-x-4 h-full">
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
                    <MoonIcon className="h-4 w-4 text-gray-400"/>
                ) : (
                    <SunIcon className="h-4 w-4 text-gray-600"/>
                )}
            </span>
                        </button>
                    </li>
                    <li>
                        <LocaleSwitcher/>
                    </li>
                    {user ? (
                        <>
                            <li className="text-sm flex items-center">{`${t('welcome')}, ${user.name}`}</li>
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className="p-2 flex items-center gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <HomeIcon/>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/evaluations`}
                                    className="p-2 flex items-center gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <EvaluationsIcon/>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/profile`}
                                    className="p-2 flex items-center gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <ProfileIcon/>
                                </Link>
                            </li>
                            <li>
                            <button
                                    onClick={handleLogout}
                                    aria-label="Logout"
                                    className="p-2 flex items-center gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <LogoutIcon />
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="flex items-center">{authLink}</li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
