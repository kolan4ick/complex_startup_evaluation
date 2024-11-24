'use client';

import EvaluationForm from "@/app/components/Form/Evaluations";
import { useTranslations } from "use-intl";
import Instructions from "@/app/components/Evaluations/Instructions";

export default function Home() {
    const t = useTranslations('HomePage');

    return (
        <div className="min-h-screen">
            <div className="flex items-center justify-center mb-10 relative">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
                    {t('titles.home.evaluation')}
                </h1>
                <div className="absolute right-0">
                    <Instructions />
                </div>
            </div>

            <EvaluationForm />
        </div>
    );
}
