'use client';

export default function Effectiveness({ register }: any) {
    return (
        <>
            {/* Effectiveness Scores */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-center">Effectiveness Evaluation</h2>

                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Sum</th>
                            <th className="border border-gray-300 px-4 py-2">Min</th>
                            <th className="border border-gray-300 px-4 py-2">Max</th>
                            <th className="border border-gray-300 px-4 py-2">Desired</th>
                            <th className="border border-gray-300 px-4 py-2">Weight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from({ length: 5 }, (_, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        step={0.01}
                                        {...register(`effectiveness_sum_scores_attributes.${index}.value`)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        step={0.01}
                                        {...register(`effectiveness_min_scores_attributes.${index}.value`)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        step={0.01}
                                        {...register(`effectiveness_max_scores_attributes.${index}.value`)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        step={0.01}
                                        {...register(`effectiveness_desired_scores_attributes.${index}.value`)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        step={0.01}
                                        {...register(`effectiveness_weight_scores_attributes.${index}.value`)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
