'use server';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import {getEvaluation} from "@/hooks/useEvaluation";
import {cookies} from "next/headers";
import Evaluation from "@/app/components/Pages/Evaluation";
import {notFound} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations({namespace: 'EvaluationPage'});

    return {
        title: `${t('titles.evaluation')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.evaluation'),
    }
}

export default async function EvaluationsPage({params}: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value || null;
    const id = (await params).id;
    let evaluationData;

    try {
        evaluationData = (await getEvaluation({id: id, token: token}));
    } catch {
        return notFound();
    }

    return <ProtectedRoute>
        <Evaluation data={evaluationData}/>
    </ProtectedRoute>;
}
