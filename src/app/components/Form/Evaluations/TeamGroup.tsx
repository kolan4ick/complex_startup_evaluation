'use client';

import {useTranslations} from "next-intl";

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
                <div key={`${group}-${index}`}>
                    <h5>
                        {t(`titles.team.groups.${group}.${index + 1 + from}`)}
                    </h5>
                    <div
                        key={index}
                        className="flex gap-4 items-start mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {/* Linguistic Select */}
                        <select
                            {...register(`team_${group}_scores_attributes.${index + from}.linguistic`)}
                            className={`${commonStyles} flex-1`}
                        >
                            {linguisticOptions.map(({value, label}) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        {/* Confidence Input */}
                        <div className="flex-1">
                            <input
                                type="number"
                                step={0.01}
                                placeholder={t('placeholders.confidence')}
                                {...register(
                                    `team_${group}_scores_attributes.${index + from}.confidence`,
                                    confidenceValidation
                                )}
                                className={`${commonStyles} w-full`}
                            />
                            <div className="h-5">
                                {errors[`team_${group}_scores_attributes`]?.[index + from]?.confidence && (
                                    <p className="text-red-600 text-sm">
                                        {errors[`team_${group}_scores_attributes`][index + from]?.confidence.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Weight Select */}
                        <select
                            {...register(`team_${group}_scores_attributes.${index + from}.weight`)}
                            className={`${commonStyles} flex-1`}
                        >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}
        </>
    );
}
