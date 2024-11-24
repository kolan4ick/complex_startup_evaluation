'use client';

import {useTranslations} from 'next-intl';

export default function About() {
    const t = useTranslations('AboutPage');

    return (
        <div>
            <h1>{t('titles.about')}</h1>
            <p>{t('descriptions.about')}</p>
        </div>
    );
}