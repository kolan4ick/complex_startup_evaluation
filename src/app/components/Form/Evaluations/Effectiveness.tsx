'use client';

import {useTranslations} from "use-intl";

export default function Effectiveness({ register, errors }: any) {
    const t = useTranslations('EvaluationForm');

    const valueValidation = {
        required: t('errors.required'),
        min: {
            value: 1,
            message: t('errors.min', { min: 1 }),
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                {t('titles.effectiveness.title')}
            </h2>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 border-b">
                        {['sum', 'min', 'max', 'desired', "desiredTerm", 'weight'].map((heading) => (
                            <th
                                key={heading}
                                className="px-10 py-3 text-center font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300"
                            >
                                {t(`effectiveness.headers.${heading}`)}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 5 }, (_, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors align-top"
                        >
                            {['sum', 'min', 'max', 'desired'].map((attribute) => (
                                <td key={attribute} className="px-3 py-3">
                                    <input
                                        type="number"
                                        title={t(`effectiveness.fields.${attribute}`, { group: index + 1 })}
                                        step={1}
                                        {...register(`effectiveness_${attribute}_scores_attributes.${index}.value`, valueValidation)}
                                        className="w-full h-10 border border-gray-300 dark:border-gray-700 rounded-lg px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                    />
                                    <div className="h-5">
                                        {errors[`effectiveness_${attribute}_scores_attributes`]?.[index]?.value && (
                                            <p className="text-red-600 text-sm">
                                                {errors[`effectiveness_${attribute}_scores_attributes`]?.[index]?.value.message}
                                            </p>
                                        )}
                                    </div>
                                </td>
                            ))}
                            <td className="px-3 py-3">
                                <select
                                    title={t('effectiveness.fields.desiredTerm', {group: index + 1})}
                                    {...register(`effectiveness_desired_term_scores_attributes.${index}.value`)}
                                    className="w-full h-10 border border-gray-300 dark:border-gray-700 rounded-lg px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-3 py-3">
                                <select
                                    title={t('effectiveness.fields.weight', {group: index + 1})}
                                    {...register(`effectiveness_weight_scores_attributes.${index}.value`)}
                                    className="w-full h-10 border border-gray-300 dark:border-gray-700 rounded-lg px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
