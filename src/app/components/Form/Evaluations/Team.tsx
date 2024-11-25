'use client';

import { useTranslations } from 'use-intl';

export default function Team({ register }: any) {
    const t = useTranslations('EvaluationForm');

    const linguisticOptions = [
        { value: 'low', label: t('fields.linguistics.low') },
        { value: 'below_middle', label: t('fields.linguistics.below_middle') },
        { value: 'middle', label: t('fields.linguistics.middle') },
        { value: 'high', label: t('fields.linguistics.high') },
    ];

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
                    <input
                        type="number"
                        placeholder={t('placeholders.stability')}
                        {...register('team_stability')}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    />
                </div>

                {Array.from({ length: 2 }, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`team_stability_scores_attributes.${index}.linguistic`)}
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
                            placeholder={t('placeholders.confidence')}
                            {...register(`team_stability_scores_attributes.${index}.confidence`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder={t('placeholders.weight')}
                            {...register(`team_stability_scores_attributes.${index}.weight`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>

            {/* Team Professional Competency */}
            <div
                className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.competency')}
                </h3>

                {[
                    {name: 'team_competencies', label: t('placeholders.competencies')},
                    {name: 'team_leaders_competencies', label: t('placeholders.leaders_competencies')}
                ].map((field) => (
                    <div key={field.name} className="mb-6 px-2">
                        <input
                            type="number"
                            placeholder={field.label}
                            {...register(`${field.name}`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}

                {Array.from({length: 3}, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`team_professional_competency_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({value, label}) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.confidence')}
                            {...register(`team_professional_competency_scores_attributes.${index}.confidence`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder={t('placeholders.weight')}
                            {...register(`team_professional_competency_scores_attributes.${index}.weight`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
                <div key={"team_competencies_and_experience"} className="mb-6 px-2">
                    <input
                        type="number"
                        placeholder={t('placeholders.competencies_experience')}
                        {...register(`${"team_competencies_and_experience"}`)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    />
                </div>
                {Array.from({length: 2}, (_, index = 3) => (
                    <div
                        key={index + 3}
                        className="grid grid-cols-3 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`team_professional_competency_scores_attributes.${index + 3}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({value, label}) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.confidence')}
                            {...register(`team_professional_competency_scores_attributes.${index + 3}.confidence`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder={t('placeholders.weight')}
                            {...register(`team_professional_competency_scores_attributes.${index + 3}.weight`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>

            {/* Team Professional Activity */}
            <div
                className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.activity')}
                </h3>

                <div className="mb-6 px-2">
                    <input
                        type="number"
                        placeholder={t('placeholders.activity')}
                        {...register('team_professional_activity')}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    />
                </div>

                {Array.from({length: 4}, (_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-6 mb-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <select
                            {...register(`team_professional_activity_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                            {linguisticOptions.map(({value, label}) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            step={0.01}
                            placeholder={t('placeholders.confidence')}
                            {...register(`team_professional_activity_scores_attributes.${index}.confidence`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder={t('placeholders.weight')}
                            {...register(`team_professional_activity_scores_attributes.${index}.weight`)}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
