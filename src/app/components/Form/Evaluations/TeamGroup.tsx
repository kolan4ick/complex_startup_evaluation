'use client';

import {useTranslations} from 'next-intl';

export default function TeamGroup({group, length, from = 0, register, errors}: any) {
    const t = useTranslations('EvaluationForm');

    const commonStyles = `
    w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2
    focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800
    text-gray-800 dark:text-gray-200 appearance-none
  `;

    const linguisticOptions = [
        {value: 'low', label: t('team.fields.linguistics.low')},
        {value: 'below_middle', label: t('team.fields.linguistics.below_middle')},
        {value: 'middle', label: t('team.fields.linguistics.middle')},
        {value: 'high', label: t('team.fields.linguistics.high')},
    ];

    const confidenceValidation = {
        required: t('errors.required'),
        min: {
            value: 0,
            message: t('errors.min', {min: 0}),
        },
    };

    return (
        <>
            {Array.from({length}, (_, index) => (
                <div key={`${group}-${index}`} className="mb-6">
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t(`titles.team.groups.${group}.${index + 1 + from}`)}
                    </h5>
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('team.fields.linguistic')}
                            </label>
                            <select
                                title={t('team.fields.linguistic')}
                                {...register(`team_${group}_scores_attributes.${index + from}.linguistic`)}
                                className={`${commonStyles}`}
                            >
                                {linguisticOptions.map(({value, label}) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('team.fields.confidence')}
                            </label>
                            <input
                                title={t('team.fields.confidence')}
                                type="number"
                                step={0.01}
                                placeholder={t('placeholders.confidence')}
                                {...register(
                                    `team_${group}_scores_attributes.${index + from}.confidence`,
                                    confidenceValidation
                                )}
                                className={`${commonStyles}`}
                            />
                            <div className="h-5">
                                {errors[`team_${group}_scores_attributes`]?.[index + from]?.confidence && (
                                    <p className="text-red-600 text-sm">
                                        {errors[`team_${group}_scores_attributes`][index + from]?.confidence.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('team.fields.weight')}
                            </label>
                            <select
                                title={t('team.fields.weight')}
                                {...register(`team_${group}_scores_attributes.${index + from}.weight`)}
                                className={`${commonStyles}`}
                            >
                                {Array.from({length: 10}, (_, i) => i + 1).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
