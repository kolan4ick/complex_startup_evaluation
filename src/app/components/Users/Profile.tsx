'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/users/usersSlice';
import { User } from '@/lib/types/User';
import { useTranslations } from 'use-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import {updateUser} from "@/hooks/useUser";

export default function Profile() {
    const t = useTranslations('ProfilePage');
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user) as User;

    const token = useAppSelector((state) => state.auth.token);

    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            feasibility_threshold: user?.feasibility_threshold,
            adjustment_delta: user?.adjustment_delta,
            feasibility_levels_attributes: user?.feasibility_levels || [],
        },
    });

    const { fields } = useFieldArray({
        control,
        name: 'feasibility_levels_attributes',
    });

    const toggleEditMode = () => {
        if (isEditing) reset(); // Reset form fields to default values when exiting edit mode
        setIsEditing(!isEditing);
    };

    const onSubmit = async (data: any) => {
        const response = await updateUser({token: token, ...data});

        if (!response) {
            return;
        }

        dispatch(setUser(response));
        setIsEditing(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto max-w-4xl p-6">
                {/* Header Section */}
                <div className="flex items-center space-x-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <div className="flex-shrink-0">
                        <UserCircleIcon className="h-24 w-24 text-gray-400 dark:text-gray-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('fields.createdAt')}: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('fields.updatedAt')}: {new Date(user.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    {/* User Related Info Section */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            {t('titles.userInformation')}
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    id: 'name',
                                    label: t('fields.name'),
                                    type: 'text',
                                    validation: { required: t('errors.required') },
                                    error: errors.name?.message,
                                },
                                {
                                    id: 'email',
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

                    {/* Evaluation Related Info Section */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            {t('titles.evaluationSettings')}
                        </h2>
                        <div className="space-y-4">
                            {/* Evaluation Fields */}
                            {[
                                {
                                    id: 'feasibility_threshold',
                                    label: t('fields.feasibilityThreshold'),
                                    type: 'float',
                                    validation: { required: t('errors.required'), min: 0, max: 1 },
                                    error: errors.feasibility_threshold?.message,
                                },
                                {
                                    id: 'adjustment_delta',
                                    label: t('fields.adjustmentDelta'),
                                    type: 'float',
                                    validation: { required: t('errors.required'), min: 0, max: 1 },
                                    error: errors.adjustment_delta?.message,
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

                            {/* Feasibility Levels */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                    {t('titles.feasibilityLevels')}
                                </h2>
                                <div className="space-y-4">
                                    {fields.map((level, index) => (
                                        <div
                                            key={level.id}
                                            className="grid grid-cols-3 gap-4 items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                                        >
                                            {/* Linguistic */}
                                            <div>
                                                <label
                                                    htmlFor={`feasibility_levels_attributes.${index}.linguistic`}
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    {t('fields.linguistic')}
                                                </label>
                                                <select
                                                    {...register(
                                                        `feasibility_levels_attributes.${index}.linguistic`
                                                    )}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed`}
                                                    disabled={true}
                                                >
                                                    {['high', 'above_middle', 'middle', 'low', 'very_low'].map(
                                                        (level) => (
                                                            <option key={level} value={level}>
                                                                {t(`fields.linguistics.${level}`)}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>

                                            {/* Title */}
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
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                                        isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            {/* Value */}
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
                                                    {...register(`feasibility_levels_attributes.${index}.value`)}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                                        isEditing
                                                            ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
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
                    className={`mt-4 w-full py-2 text-white rounded-lg ${
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
