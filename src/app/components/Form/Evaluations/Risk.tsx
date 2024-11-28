'use client';

import { useTranslations } from 'use-intl';
import RiskGroup from "@/app/components/Form/Evaluations/RiskGroup";

export default function Risk({register, errors}: any) {
    const t = useTranslations('EvaluationForm');

    const groups = [
        { group: 'operational', length: 9 },
        { group: 'investment', length: 5 },
        { group: 'financial', length: 5 },
        { group: 'innovation_activity', length: 5 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 sm:p-8 space-y-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                {t('titles.risks.title')}
            </h2>

            <div className="space-y-6 sm:space-y-8">
                {groups.map((group) => (
                    <RiskGroup
                        key={`${group.group}_risks`}
                        group={group.group}
                        length={group.length}
                        register={register}
                        errors={errors}
                    />
                ))}
            </div>
        </div>
    );
}
