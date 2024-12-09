'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/users/usersSlice';
import { User } from '@/lib/types/User';
import { useTranslations } from 'use-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { updateUser } from '@/hooks/useUser';

export default function Profile() {
    const t = useTranslations('ProfilePage');
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user) as User;

    const token = useAppSelector((state) => state.auth.token);

    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            adjustment_delta: user?.adjustment_delta,
            feasibility_levels_attributes: user?.feasibility_levels || [],
        },
    });

    const { fields } = useFieldArray({
        control,
        name: 'feasibility_levels_attributes',
    });

    const toggleEditMode = () => {
        if (isEditing) reset();
        setIsEditing(!isEditing);
    };

    const onSubmit = async (data: any) => {
        try {
            const response = await updateUser({ token, ...data });

            dispatch(setUser(response));
            setIsEditing(false);
            setErrorMessage('');
        } catch (err: any) {
            if (err.response?.data?.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage(t('errors.unknown'));
            }
        }
    };

    useEffect(() => {
        if (errorMessage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [errorMessage]);

    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <div className="flex-shrink-0 mb-4 sm:mb-0">
                        <UserCircleIcon className="h-24 w-24 text-gray-400 dark:text-gray-600" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('fields.createdAt')}: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('fields.updatedAt')}: {new Date(user.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {errorMessage && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            {t('titles.userInformation')}
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    id: 'name' as const,
                                    label: t('fields.name'),
                                    type: 'text',
                                    validation: { required: t('errors.required') },
                                    error: errors.name?.message,
                                },
                                {
                                    id: 'email' as const,
                                    label: t('fields.email'),
                                    type: 'email',
                                    validation: {
                                        required: t('errors.required'),
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: t('errors.invalidEmail'),
                                        },
                                    },
                                    error: errors.email?.message,
                                },
                            ].map(({ id, label, type, validation, error }) => (
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
                                        {...register(id, validation)}
                                        className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                            isEditing
                                                ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                        }`}
                                        disabled={!isEditing}
                                    />
                                    <div className="h-5">
                                        {error && <p className="text-red-600 text-sm">{error}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            {t('titles.evaluationSettings')}
                        </h2>
                        <div className="space-y-4">
                            <div key={"adjustment_delta"}>
                                <label
                                    htmlFor={"adjustment_delta"}
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {t('fields.adjustmentDelta')}
                                </label>
                                <input
                                    type={'number'}
                                    id={"adjustment_delta"}
                                    step={0.01}
                                    {...register("adjustment_delta", {
                                        required: t('errors.required'),
                                        min: {value: 0.01, message: t('errors.minValue', {min: 0.01})},
                                        max: {value: 1.0, message: t('errors.maxValue', {max: 1.0})},
                                    })}
                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                        isEditing
                                            ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                    disabled={!isEditing}
                                />
                                <div className="h-5">
                                    {errors.adjustment_delta?.message && <p className="text-red-600 text-sm">{errors.adjustment_delta?.message}</p>}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                    {t('titles.feasibilityLevels')}
                                </h2>
                                <div className="space-y-4">
                                    {fields.map((level, index) => (
                                        <div
                                            key={level.id}
                                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <div>
                                                <label
                                                    htmlFor={`feasibility_levels_attributes.${index}.linguistic`}
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    {t('fields.linguistic')}
                                                </label>
                                                <select
                                                    {...register(`feasibility_levels_attributes.${index}.linguistic`)}
                                                    className={`mt-1 w-full border dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed appearance-none`}
                                                    disabled={true}
                                                >
                                                    {['high', 'above_middle', 'middle', 'low', 'very_low'].map((lvl) => (
                                                        <option key={lvl} value={lvl}>
                                                            {t(`fields.linguistics.${lvl}`)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`feasibility_levels_attributes.${index}.title`}
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    {t('fields.title')}
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register(`feasibility_levels_attributes.${index}.title`)}
                                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                                        isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`feasibility_levels_attributes.${index}.value`}
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    {t('fields.value')}
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    {...register(`feasibility_levels_attributes.${index}.value`, {
                                                        required: t('errors.required'),
                                                        min: {value: 0.01, message: t('errors.minValue', {min: 0.01})},
                                                        max: {value: 1.0, message: t('errors.maxValue', {max: 1.0})},
                                                    })}
                                                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                                        isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                    disabled={!isEditing}
                                                />
                                                <div className="h-5">
                                                    {errors.feasibility_levels_attributes?.[index]?.value && (
                                                        <p className="text-red-600 text-sm">
                                                            {errors.feasibility_levels_attributes[index].value.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <button
                            type="submit"
                            className="w-full py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {t('buttons.save')}
                        </button>
                    )}
                </form>

                <button
                    onClick={toggleEditMode}
                    className={`w-full py-2 text-white rounded-lg ${
                        isEditing
                            ? 'bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700'
                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {isEditing ? t('buttons.cancel') : t('buttons.edit')}
                </button>
            </div>
        </div>
    );
}
