'use client';

import {useTranslations} from "use-intl";

export default function Effectiveness({ register }: any) {
    const t = useTranslations('EvaluationForm');

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                {t('titles.effectiveness.title')}
            </h2>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 border-b">
                        {['sum', 'min', 'max', 'desired', "desired_term", 'weight'].map((heading) => (
                            <th
                                key={heading}
                                className="px-6 py-3 text-center font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300"
                            >
                                {t(`fields.effectiveness.${heading}`)}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 5 }, (_, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="px-6 py-3">
                                <input
                                    type="number"
                                    step={0.01}
                                    {...register(`effectiveness_sum_scores_attributes.${index}.value`)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                />
                            </td>
                            <td className="px-6 py-3">
                                <input
                                    type="number"
                                    step={0.01}
                                    {...register(`effectiveness_min_scores_attributes.${index}.value`)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                />
                            </td>
                            <td className="px-6 py-3">
                                <input
                                    type="number"
                                    step={0.01}
                                    {...register(`effectiveness_max_scores_attributes.${index}.value`)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                />
                            </td>
                            <td className="px-6 py-3">
                                <input
                                    type="number"
                                    step={0.01}
                                    {...register(`effectiveness_desired_scores_attributes.${index}.value`)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                />
                            </td>
                            <td className="px-6 py-3">
                                <input
                                    type="number"
                                    step={0.01}
                                    {...register(`effectiveness_desired_term_scores_attributes.${index}.value`)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                />
                            </td>
                            <td className="px-6 py-3">
                                <input
                                    type="number"
                                    step={0.01}
                                    {...register(`effectiveness_weight_scores_attributes.${index}.value`)}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
