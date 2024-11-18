'use client';

import React from 'react';
import {useAppDispatch} from '@/lib/hooks';
import {setUser, setToken} from '@/lib/features/users/usersSlice';
import {registerUser} from '@/hooks/useUser';
import {useTranslations} from "use-intl";
import {useRouter} from "next/navigation";
import {useForm} from 'react-hook-form';

interface FormData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export default function Register() {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm<FormData>();
    const t = useTranslations('RegisterPage');
    const router = useRouter();

    // Watch the password for confirmation validation
    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        try {
            const response = await registerUser(data);

            const user = response.user;
            const token = response.token;

            console.log(user, token);

            dispatch(setUser(user));
            dispatch(setToken(token));

            document.cookie = `auth-token=${token}; path=/`;

            router.push('/');
        } catch (err: any) {
            console.log(err);
            alert(t(`errors.${err.status}`) || t('errors.unknown'));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">{t("titles.registration")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            {t('fields.name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {required: t('errors.required')})}
                            className="text-gray-800 mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.name')}
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                            className="text-gray-800 mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.email')}
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t('fields.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: t('errors.required'),
                                minLength: {value: 6, message: t('errors.passwordMinLength')}
                            })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.password')}
                        />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
                            {t('fields.passwordConfirmation')}
                        </label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            {...register('passwordConfirmation', {
                                required: t('errors.required'),
                                validate: (value) => value === password || t('errors.passwordsDoNotMatch')
                            })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.passwordConfirmation')}
                        />
                        {errors.passwordConfirmation && (
                            <p className="text-red-600 text-sm">{errors.passwordConfirmation.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 text-white rounded-lg ${
                            isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {isSubmitting ? t("buttons.submitting") : t("buttons.register")}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    {`${t('links.alreadyHaveAccount')} `}
                    <a href="/login" className="text-blue-600 hover:text-blue-700">
                        {t('links.login')}
                    </a>
                </p>
            </div>
        </div>
    );
}
