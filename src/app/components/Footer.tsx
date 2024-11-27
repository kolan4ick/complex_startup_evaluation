'use client';

import { useLocale, useTranslations } from 'use-intl';
import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@/app/components/Icons/HomeIcon';
import AboutIcon from '@/app/components/Icons/AboutIcon';
import InstructionsIcon from '@/app/components/Icons/InstructionsIcon';

export default function Footer() {
    const t = useTranslations('Footer');
    const locale = useLocale();

    return (
        <footer className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Image
                        src="/favicon.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                        priority
                    />
                    <span className="text-lg font-semibold">{t('brandName')}</span>
                </div>

                <ul className="flex items-center space-x-6">
                    <li>
                        <Link
                            href={`/${locale}`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            <HomeIcon />
                            <span>{t('links.home')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${locale}/about`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            <AboutIcon />
                            <span>{t('links.about')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${locale}/instructions`}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                            <InstructionsIcon/>
                            <span>{t('links.instructions')}</span>
                        </Link>
                    </li>
                </ul>

                <div className="text-center md:text-right text-sm mt-4 md:mt-0">
                    <p>&copy; {new Date().getFullYear()} {t('brandName')}. {t('rightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
}
