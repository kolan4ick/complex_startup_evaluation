'use client';

import { useTranslations } from "next-intl";

export default function RiskGroup({group, length, register, errors}: any) {
    const t = useTranslations('EvaluationForm');

    const linguisticOptions = [
        { value: 'low', label: t('risks.fields.linguistics.low') },
        { value: 'below_middle', label: t('risks.fields.linguistics.below_middle') },
        { value: 'middle', label: t('risks.fields.linguistics.middle') },
        { value: 'above_middle', label: t('risks.fields.linguistics.above_middle') },
        { value: 'high', label: t('risks.fields.linguistics.high') },
    ];

    const authenticityValidation = {
        required: t('errors.required'),
        min: {
            value: 0.01,
            message: t('errors.min', { min: 0.01 })
        },
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t(`titles.risks.groups.${group}.title`)}
            </h3>
            {Array.from({ length }, (_, index) => (
                <div key={`${group}-${index}`} className="mb-6">
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t(`titles.risks.groups.${group}.${index + 1}`)}
                    </p>
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('risks.fields.linguistic')}
                            </label>
                            <select
                                title={t('risks.fields.linguistic')}
                                {...register(`risk_${group}_scores_attributes.${index}.linguistic`)}
                                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 appearance-none"
                            >
                                {linguisticOptions.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('risks.fields.authenticity')}
                            </label>
                            <input
                                title={t('risks.fields.authenticity')}
                                type="number"
                                step={0.01}
                                placeholder={t('placeholders.authenticity')}
                                {...register(
                                    `risk_${group}_scores_attributes.${index}.authenticity`,
                                    authenticityValidation
                                )}
                                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            />
                            <div className="h-5">
                                {errors[`risk_${group}_scores_attributes`]?.[index]?.authenticity && (
                                    <p className="text-red-600 text-sm">
                                        {errors[`risk_${group}_scores_attributes`][index].authenticity.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
