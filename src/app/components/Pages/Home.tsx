'use client';

import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "use-intl";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import EvaluationForm from "@/app/components/Form/Evaluations";

export default function Home() {
    const t = useTranslations('HomePage');
    const user = useAppSelector((state) => state.auth.user);
    const [showModal, setShowModal] = useState(false);
    const cookiesStore = useCookies();

    useEffect(() => {
        if (user) {
            const welcomeKey = `welcome_${user.id}`;
            const welcomeCookie = cookiesStore.get(welcomeKey);

            if (!welcomeCookie || welcomeCookie === 'false') {
                setShowModal(true);
                cookiesStore.set(welcomeKey, 'true', {
                    path: '/',
                    expires: 30 * 24 * 60 * 60,
                });
            }
        }
    }, [user]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="min-h-screen">
            <div className="flex items-center justify-center mb-10 relative">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
                    {t('titles.home.evaluation')}
                </h1>
            </div>

            <EvaluationForm />

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 p-10 w-11/12 max-w-3xl">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                            {t('modal.welcomeTitle')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-center mb-8">
                            {t.rich('modal.welcomeMessage', {
                                aboutLink: (chunks) => (
                                    <Link href="/about" className="text-blue-600 hover:underline">
                                        {chunks}
                                    </Link>
                                ),
                                instructionsLink: (chunks) => (
                                    <Link href="/instructions" className="text-blue-600 hover:underline">
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleCloseModal}
                                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                {t('modal.closeButton')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
