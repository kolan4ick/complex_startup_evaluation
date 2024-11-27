'use client';

import {useTranslations} from 'next-intl';
import {useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";

export default function About() {
    const t = useTranslations('AboutPage');
    const user = useAppSelector(state => state.auth.user);
    const router = useRouter();

    function handleButtonClick() {
        if (user) {
            router.push('/');
        } else {
            router.push('/login');
        }
    }

    return (
        <div
            className="p-6 bg-gradient-to-b from-blue-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-8">
                {t('titles.about')}
            </h1>

            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-6 space-y-4">
                <div className="flex items-center space-x-3">
                    <span className="text-3xl">🌟</span>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {t('titles.whatWeOffer')}
                    </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('descriptions.intro')}
                </p>
            </div>

            <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
                    {t('titles.keyFeatures')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">📊</span>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {t('descriptions.effectivenessTitle')}
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('descriptions.effectiveness')}
                        </p>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">🔗</span>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {t('descriptions.risksTitle')}
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('descriptions.risks')}
                        </p>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">📈</span>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {t('descriptions.teamTitle')}
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('descriptions.team')}
                        </p>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">💰</span>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {t('descriptions.financialTitle')}
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('descriptions.financial')}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                    <span className="text-3xl">🛠️</span>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {t('titles.tools')}
                    </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    {t('descriptions.tools')}
                </p>
            </div>

            <div className="mt-8 bg-blue-100 dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                    {t('titles.invitation')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t('descriptions.invitationDetails')}
                </p>
                <button onClick={handleButtonClick}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-300 transform hover:scale-105">
                    {t('buttons.getStarted')}
                </button>
            </div>
        </div>
    );
}