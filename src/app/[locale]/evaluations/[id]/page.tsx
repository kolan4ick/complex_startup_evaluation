'use server';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import {getEvaluation} from "@/hooks/useEvaluation";
import {cookies} from "next/headers";
import EvaluationPage from "@/app/components/Pages/Evaluation";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'EvaluationPage'});

    return {
        title: `${t('titles.evaluation')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.evaluation'),
    }
}

export default async function EvaluationsPage({params}: {params: {id: string}}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value || null;
    const id = params.id;

    const evaluationData = (await getEvaluation({id: id, token: token}));

    return <ProtectedRoute>
        <EvaluationPage data={evaluationData}/>
    </ProtectedRoute>;
}
