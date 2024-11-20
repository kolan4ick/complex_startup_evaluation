"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import LanguageIcon from "@/app/components/Icons/LanguageIcon";

export default function LocaleSwitcher() {
    const t = useTranslations("Lang");
    const locales = ["uk", "en"];
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();

    const currentPage =
        pathname.startsWith("/en") || pathname.startsWith("/uk")
            ? pathname.slice(3) || "/"
            : pathname;

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative z-50">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="p-2 flex items-center gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <LanguageIcon />
                {locale.toUpperCase()}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                    className={`transition-transform transform ${isOpen ? "rotate-180" : ""}`}
                >
                    <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-2 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2"
                >
                    {locales.map((local) => (
                        <Link
                            key={local}
                            href={`/${local}${currentPage}`}
                            className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
                                locale === local ? "font-semibold text-blue-500 pointer-events-none" : ""
                            }`}
                        >
                            {t(local)}
                        </Link>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
