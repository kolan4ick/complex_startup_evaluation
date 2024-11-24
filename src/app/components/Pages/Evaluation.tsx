'use client';

import EvaluationForm from "@/app/components/Form/Evaluations";
import {useTranslations} from "use-intl";

export default function Evaluation({data}: {data?: any}) {
    const t = useTranslations('HomePage');

    const evaluation = data.evaluation;
    const result = data.result;

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
                {
                    `${t('titles.home.evaluation')} #${evaluation.id}`
                }
            </h1>
            <EvaluationForm evaluation={evaluation} result={result}/>
        </div>
    );
}
