'use client';

import React, {useState} from 'react';
import {useAppDispatch} from '@/lib/hooks';
import {setUser, setToken} from '@/lib/features/users/usersSlice';
import {loginUser} from '@/hooks/useUser';
import {useTranslations} from "use-intl";
import {useRouter} from "next/navigation";

export default function Login() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const t = useTranslations('LoginPage');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const {user, token} = await loginUser({email, password});

            if (user && token) {
                dispatch(setUser(user));
                dispatch(setToken(token));

                document.cookie = `auth-token=${token}; path=/`;

                router.push('/');
            } else {
                console.error('Either user or token is missing.');
                setError(t('errors.unknown'));
            }
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.status) {
                setError(t(`errors.${err.status}`));
            } else {
                setError(t('errors.unknown'));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t('fields.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.email')}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t('fields.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('placeholders.password')}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white rounded-lg ${
                            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
                </form>
                <p className="text-sm text-center text-gray-600">
                    {`${t('links.forgotPassword')} `}
                    <a href="/register" className="text-blue-600 hover:text-blue-700">
                        {t('links.register')}
                    </a>
                </p>
            </div>
        </div>
    );
}
