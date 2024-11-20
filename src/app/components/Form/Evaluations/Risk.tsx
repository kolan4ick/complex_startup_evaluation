'use client';

import { useTranslations } from 'use-intl';

export default function Risk({ register }: any) {
    const t = useTranslations('HomePage');

    const linguisticOptions = [
        { value: 'low', label: t('fields.linguistics.low') },
        { value: 'below_middle', label: t('fields.linguistics.below_middle') },
        { value: 'middle', label: t('fields.linguistics.middle') },
        { value: 'above_middle', label: t('fields.linguistics.above_middle') },
        { value: 'high', label: t('fields.linguistics.high') },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-8 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                {t('titles.risks.title')}
            </h2>

            {/* Operational Risks */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.risks.operational')}
                </h3>
                {Array.from({ length: 9 }, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`risk_operational_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.authenticity')}
                            {...register(`risk_operational_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>

            {/* Investment Risks */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.risks.investment')}
                </h3>
                {Array.from({ length: 5 }, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`risk_investment_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.authenticity')}
                            {...register(`risk_investment_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>

            {/* Financial Risks */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.risks.financial')}
                </h3>
                {Array.from({ length: 5 }, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`risk_financial_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.authenticity')}
                            {...register(`risk_financial_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>

            {/* Innovation Risks */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.risks.innovation')}
                </h3>
                {Array.from({ length: 5 }, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`risk_innovation_activity_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.authenticity')}
                            {...register(`risk_innovation_activity_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
