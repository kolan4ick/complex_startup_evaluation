'use client';

import React from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setUser, setToken } from '@/lib/features/users/usersSlice';
import { registerUser } from '@/hooks/useUser';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface FormData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export default function Register() {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
    const t = useTranslations('RegisterPage');
    const router = useRouter();

    // Watch the password for confirmation validation
    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        try {
            const response = await registerUser(data);

            const user = response.user;
            const token = response.token;

            dispatch(setUser(user));
            dispatch(setToken(token));

            document.cookie = `auth-token=${token}; path=/`;

            router.push('/');
        } catch (err: any) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert(t(`errors.${err.status}`));
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                    {t("titles.registration")}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {[
                        {
                            id: 'name',
                            label: t('fields.name'),
                            type: 'text',
                            placeholder: t('placeholders.name'),
                            validation: { required: t('errors.required') },
                            error: errors.name?.message,
                        },
                        {
                            id: 'email',
                            label: t('fields.email'),
                            type: 'email',
                            placeholder: t('placeholders.email'),
                            validation: {
                                required: t('errors.required'),
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: t('errors.invalidEmail'),
                                },
                            },
                            error: errors.email?.message,
                        },
                        {
                            id: 'password',
                            label: t('fields.password'),
                            type: 'password',
                            placeholder: t('placeholders.password'),
                            validation: {
                                required: t('errors.required'),
                                minLength: { value: 6, message: t('errors.passwordMinLength') },
                            },
                            error: errors.password?.message,
                        },
                        {
                            id: 'passwordConfirmation',
                            label: t('fields.passwordConfirmation'),
                            type: 'password',
                            placeholder: t('placeholders.passwordConfirmation'),
                            validation: {
                                required: t('errors.required'),
                                validate: (value: string) =>
                                    value === password || t('errors.passwordsDoNotMatch'),
                            },
                            error: errors.passwordConfirmation?.message,
                        },
                    ].map(({ id, label, type, placeholder, validation, error }) => (
                        <div key={id}>
                            <label
                                htmlFor={id}
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                {label}
                            </label>
                            <input
                                type={type}
                                id={id}
                                {...register(id as keyof FormData, validation)}
                                className="text-gray-800 dark:text-gray-200 mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder={placeholder}
                            />
                            <div className="h-5">
                                {error && <p className="text-red-600 text-sm">{error}</p>}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 text-white rounded-lg ${
                            isSubmitting
                                ? 'bg-blue-300 dark:bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {isSubmitting ? t("buttons.submitting") : t("buttons.register")}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    {`${t('links.alreadyHaveAccount')} `}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                    >
                        {t('links.login')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
