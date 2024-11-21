'use client';

import EvaluationForm from "@/app/components/Form/Evaluations";
import {useTranslations} from "use-intl";

export default function Home() {
    const t = useTranslations('HomePage');

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
                {
                    t('titles.home.evaluation')
                }
            </h1>
            <EvaluationForm/>
        </div>
    );
}
