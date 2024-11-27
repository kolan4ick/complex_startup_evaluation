'use client';

import { useTranslations } from 'next-intl';
import EvaluationList from '@/app/components/Pages/Instructions/EvaluationList';
import { useRouter } from 'next/navigation';

export default function InstructionsPage() {
    const t = useTranslations('InstructionsPage');
    const router = useRouter();

    function handleBackClick() {
        router.push('/');
    }

    return (
        <div className="p-6 bg-gradient-to-b from-blue-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-8">
                {t('titles.instructions.title')}
            </h1>

            <div
                className="bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8 space-y-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('titles.welcome')}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {t('functionality.title')}
                </h2>
                <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300 space-y-2">
                    {['1', '2', '3', '4'].map((position) => (
                        <li key={`functionality-${position}`}>
                            {t(`functionality.evaluations.${position}`)}
                        </li>
                    ))}
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('functionality.startEvaluation')}
                </p>
            </div>

            <div className="mt-8">
                <EvaluationList />
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleBackClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-300 transform hover:scale-105"
                >
                    {t('buttons.backToHome')}
                </button>
            </div>
        </div>
    );
}