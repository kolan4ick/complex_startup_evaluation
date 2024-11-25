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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-6 space-y-6">
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
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                >
                    {t('buttons.backToHome')}
                </button>
            </div>
        </div>
    );
}