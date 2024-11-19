'use client';

import { useAppDispatch } from '@/lib/hooks';
import { setUser, setToken } from '@/lib/features/users/usersSlice';
import { loginUser } from '@/hooks/useUser';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
    const t = useTranslations('LoginPage');
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const { user, token } = await loginUser(data);

            if (user && token) {
                dispatch(setUser(user));
                dispatch(setToken(token));

                document.cookie = `auth-token=${token}; path=/`;

                router.push('/');
            } else {
                alert(t('errors.unknown'));
            }
        } catch (err: any) {
            if (err.status) {
                alert(t(`errors.${err.status}`));
            } else {
                alert(t('errors.unknown'));
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                    {t("titles.login")}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {t('fields.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: t('errors.required'),
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: t('errors.invalidEmail')
                                }
                            })}
                            className="mt-1 w-full px-4 py-2 border text-black dark:text-gray-200 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.email')}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {t('fields.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: t('errors.required'),
                                minLength: {
                                    value: 6,
                                    message: t('errors.passwordMinLength')
                                }
                            })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-black dark:text-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.password')}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 text-white rounded-lg ${
                            isSubmitting
                                ? 'bg-blue-300 dark:bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {isSubmitting ? t("buttons.submitting") : t("buttons.login")}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    {`${t('links.dontHaveAnAccount')} `}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
                        {t('links.register')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
