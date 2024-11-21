import React from "react";

export default function TeamResults({ team }: { team: any }) {
    const { membership, defuzzification, rate } = team;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Team Results
            </h2>

            {/* First Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Membership Values
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2">K</th>
                        <th className="px-4 py-2">Membership</th>
                    </tr>
                    </thead>
                    <tbody>
                    {membership.map((kArray: number[], i: number) =>
                        kArray.map((value: number, idx: number) => (
                            <tr
                                key={`${i}-${idx}`}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <td className="border px-4 py-2">
                                    K{i + 1}{idx + 1}
                                </td>
                                <td className="border px-4 py-2">
                                    {value.toFixed(3)}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Defuzzification */}
            <div className="text-center space-y-4">
                <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Defuzzification (Z)
                    </h5>
                    <b className="text-xl text-blue-600 dark:text-blue-400">
                        {defuzzification.toFixed(4)}
                    </b>
                </div>
            </div>

            {/* Team Rating */}
            <div className="text-center space-y-4">
                <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Team Rating
                    </h5>
                    <b className="text-xl text-blue-600 dark:text-blue-400">{rate}</b>
                </div>
            </div>
        </div>
    );
}
