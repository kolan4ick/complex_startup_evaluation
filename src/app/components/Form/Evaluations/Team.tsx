'use client';

import { useTranslations } from 'use-intl';

export default function Team({ register, errors }: any) {
    const t = useTranslations('EvaluationForm');

    const linguisticOptions = [
        { value: 'low', label: t('fields.linguistics.low') },
        { value: 'below_middle', label: t('fields.linguistics.below_middle') },
        { value: 'middle', label: t('fields.linguistics.middle') },
        { value: 'high', label: t('fields.linguistics.high') },
    ];

    const confidenceValidation = {
        required: t('errors.required'),
        min: {
            value: 0,
            message: t('errors.min', { min: 0 }),
        },
    };

    const commonStyles = `
        w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2
        focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800
        text-gray-800 dark:text-gray-200 appearance-none
    `;

    const numberOptions = Array.from({ length: 10 }, (_, i) => i + 1); // Create array [1, 2, ..., 10]

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                {t('titles.team.title')}
            </h2>

            {/* Team Stability */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.stability')}
                </h3>

                <div className="mb-6 px-2">
                    <select
                        {...register('team_stability')}
                        className={commonStyles}
                    >
                        {numberOptions.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                {Array.from({ length: 2 }, (_, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-start mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {/* Linguistic Select */}
                        <select
                            {...register(`team_stability_scores_attributes.${index}.linguistic`)}
                            className={`${commonStyles} flex-1`}
                        >
                            {linguisticOptions.map(({ value, label }) => (
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
                                    `team_stability_scores_attributes.${index}.confidence`,
                                    confidenceValidation
                                )}
                                className={`${commonStyles} w-full`}
                            />
                            <div className="h-5">
                                {errors.team_stability_scores_attributes?.[index]?.confidence && (
                                    <p className="text-red-600 text-sm">
                                        {errors.team_stability_scores_attributes[index]?.confidence.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Weight Select */}
                        <select
                            {...register(`team_stability_scores_attributes.${index}.weight`)}
                            className={`${commonStyles} flex-1`}
                        >
                            {numberOptions.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {/* Team Professional Competency */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.competency')}
                </h3>

                {[
                    { name: 'team_competencies', label: t('placeholders.competencies') },
                    { name: 'team_leaders_competencies', label: t('placeholders.leaders_competencies') },
                ].map((field) => (
                    <div key={field.name} className="mb-6 px-2">
                        <select
                            {...register(`${field.name}`)}
                            className={commonStyles}
                        >
                            {numberOptions.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                {Array.from({ length: 3 }, (_, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-start mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <select
                            {...register(
                                `team_professional_competency_scores_attributes.${index}.linguistic`
                            )}
                            className={`${commonStyles} flex-1`}
                        >
                            {linguisticOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <div className="flex-1">
                            <input
                                type="number"
                                step={0.01}
                                placeholder={t('placeholders.confidence')}
                                {...register(
                                    `team_professional_competency_scores_attributes.${index}.confidence`,
                                    confidenceValidation
                                )}
                                className={`${commonStyles} w-full`}
                            />
                            <div className="h-5">
                                {errors.team_professional_competency_scores_attributes?.[index]?.confidence && (
                                    <p className="text-red-600 text-sm">
                                        {errors.team_professional_competency_scores_attributes[index]?.confidence.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Weight Select */}
                        <select
                            {...register(
                                `team_professional_competency_scores_attributes.${index}.weight`
                            )}
                            className={`${commonStyles} flex-1`}
                        >
                            {numberOptions.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {/* Team Professional Activity */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.activity')}
                </h3>

                <div className="mb-6 px-2">
                    <select
                        {...register('team_professional_activity')}
                        className={commonStyles}
                    >
                        {numberOptions.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-start mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <select
                            {...register(
                                `team_professional_activity_scores_attributes.${index}.linguistic`
                            )}
                            className={`${commonStyles} flex-1`}
                        >
                            {linguisticOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <div className="flex-1">
                            <input
                                type="number"
                                step={0.01}
                                placeholder={t('placeholders.confidence')}
                                {...register(
                                    `team_professional_activity_scores_attributes.${index}.confidence`,
                                    confidenceValidation
                                )}
                                className={`${commonStyles} w-full`}
                            />
                            <div className="h-5">
                                {errors.team_professional_activity_scores_attributes?.[index]?.confidence && (
                                    <p className="text-red-600 text-sm">
                                        {errors.team_professional_activity_scores_attributes[index]?.confidence.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Weight Select */}
                        <select
                            {...register(
                                `team_professional_activity_scores_attributes.${index}.weight`
                            )}
                            className={`${commonStyles} flex-1`}
                        >
                            {numberOptions.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}
