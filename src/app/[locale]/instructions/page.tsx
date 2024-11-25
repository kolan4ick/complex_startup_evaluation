'use server';

import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import Instructions from "@/app/components/Pages/Instructions";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'InstructionsPage'});

    return {
        title: `${t('titles.instructions.title')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.instructions'),
    }
}

export default async function InstructionsPage() {
    return (
        <Instructions/>
    );
}