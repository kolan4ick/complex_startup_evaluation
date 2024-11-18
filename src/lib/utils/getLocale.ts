'use server';

import {cookies} from 'next/headers';

export const getLocale = async (): Promise<string> => {
    const cookiesStorage = await cookies();
    return cookiesStorage.get('NEXT_LOCALE')?.value || 'en';
};