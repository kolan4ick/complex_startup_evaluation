'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 border-t-2 border-gray-200 dark:border-gray-700 py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} {t('companyName')}. {t('rightsReserved')}
                    </p>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-blue-500 dark:hover:text-gray-400 transition-colors duration-300"
                        >
                            {t('links.home')}
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
