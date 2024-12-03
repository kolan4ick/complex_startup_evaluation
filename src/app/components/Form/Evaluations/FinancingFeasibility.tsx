'use client';

import { useTranslations } from 'use-intl';

export default function FinancingFeasibility({ register, errors }: any) {
    const t = useTranslations('EvaluationForm');

    const feasibilityOptions = [
        { value: "high", label: t('feasibility.fields.feasibility_linguistics.high') },
        { value: "above_middle", label: t('feasibility.fields.feasibility_linguistics.above_middle') },
        { value: "middle", label: t('feasibility.fields.feasibility_linguistics.middle') },
        { value: "low", label: t('feasibility.fields.feasibility_linguistics.low') },
        { value: "very_low", label: t('feasibility.fields.feasibility_linguistics.very_low') },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 sm:p-8 space-y-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                {t('titles.feasibility.title')}
            </h2>
            <div className="space-y-6 sm:space-y-8">
                <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        {t('titles.feasibility.subtitle')}
                    </h3>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('feasibility.fields.feasibility_linguistic')}
                        </label>
                        <select
                            title={t('feasibility.fields.feasibility_linguistic')}
                            {...register("feasibility_linguistic")}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 appearance-none"
                        >
                            {feasibilityOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <div className="h-5">
                            {errors?.evaluation?.feasibility_linguistic && (
                                <p className="text-red-600 text-sm">
                                    {errors.evaluation.feasibility_linguistic.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}