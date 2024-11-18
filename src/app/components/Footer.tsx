'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="light:bg-white border-2 text-black py-6 dark:bg-black">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} {t('companyName')}. {t('rightsReserved')}
                    </p>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-blue-400">
                            {t('links.home')}
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
