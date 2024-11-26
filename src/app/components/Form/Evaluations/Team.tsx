'use client';

import {useTranslations} from 'use-intl';
import TeamGroup from "@/app/components/Form/Evaluations/TeamGroup";

export default function Team({register, errors}: any) {
    const t = useTranslations('EvaluationForm');

    const commonStyles = `
        w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2
        focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800
        text-gray-800 dark:text-gray-200 appearance-none
    `;

    const numberOptions = Array.from({length: 10}, (_, i) => i + 1); // Create array [1, 2, ..., 10]

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                {t('titles.team.title')}
            </h2>

            {/* Team Stability */}
            <div
                className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.groups.stability.title')}
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

                <TeamGroup key={"team_stability"} group={"stability"} length={2} register={register} errors={errors}/>

            </div>

            {/* Team Professional Competency */}
            <div
                className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.groups.professional_competency.title')}
                </h3>

                {[
                    {name: 'team_competencies', label: t('placeholders.competencies')},
                    {name: 'team_leaders_competencies', label: t('placeholders.leaders_competencies')},
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
                <TeamGroup key={"team_professional_competency_1"} group={"professional_competency"} length={3}
                           register={register} errors={errors}/>

                <div key={"team_competencies_and_experience"} className="mb-6 px-2">
                    <select
                        {...register(`team_competencies_and_experience`)}
                        className={commonStyles}
                    >
                        {numberOptions.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <TeamGroup key={"team_professional_competency_2"} group={"professional_competency"} from={3} length={2}
                           register={register} errors={errors}/>

            </div>

            {/* Team Professional Activity */}
            <div
                className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {t('titles.team.groups.professional_activity.title')}
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

                <TeamGroup key={"team_professional_activity"} group={"professional_activity"} length={4} register={register} errors={errors}/>
            </div>
        </div>
    );
}
