import React from "react";

export default function RiskResults({ risk }: { risk: any }) {
    const {
        res_term_estimate,
        aggregated_reliability_assessment,
        estimated_membership,
        aggregated_membership,
        security_level,
    } = risk;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Risk Results
            </h2>

            {/* First Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Res Term Estimate
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2">Index</th>
                            <th className="px-4 py-2">K</th>
                            <th className="px-4 py-2">Linguistic</th>
                            <th className="px-4 py-2">Aggregated Assessment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {res_term_estimate.map((estimate: any, index: number) => (
                            <React.Fragment key={index}>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="border px-4 py-2" colSpan={4}>
                                        K{index}
                                    </td>
                                </tr>
                                {estimate.k.map((value: [string, number], idx: number) => (
                                    <tr
                                        key={`${index}-${idx}`}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="border px-4 py-2">{idx + 1}</td>
                                        <td className="border px-4 py-2">K{index}{idx + 1}</td>
                                        <td className="border px-4 py-2">{value[0]}</td>
                                        {idx === 0 && (
                                            <td
                                                className="border px-4 py-2"
                                                rowSpan={estimate.k.length}
                                            >
                                                {estimate.aggregated_assessment}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Second Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Aggregated Reliability Assessment
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2">Index</th>
                            <th className="px-4 py-2">K</th>
                            <th className="px-4 py-2">Linguistic</th>
                            <th className="px-4 py-2">Authenticity</th>
                            <th className="px-4 py-2">Aggregated Reliability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aggregated_reliability_assessment.map(
                            (assessment: any, index: number) => (
                                <React.Fragment key={index}>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="border px-4 py-2" colSpan={4}>
                                            K{index}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {assessment.k.aggregated_assessment}
                                        </td>
                                    </tr>
                                    {assessment.k.map(
                                        (value: [string, number], idx: number) => (
                                            <tr
                                                key={`${index}-${idx}`}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <td className="border px-4 py-2">{idx + 1}</td>
                                                <td className="border px-4 py-2">
                                                    K{index}{idx + 1}
                                                </td>
                                                <td className="border px-4 py-2">{value[0]}</td>
                                                <td className="border px-4 py-2">
                                                    {value[1].toFixed(2)}
                                                </td>
                                                {idx === 0 && (
                                                    <td
                                                        className="border px-4 py-2"
                                                        rowSpan={assessment.k.length}
                                                    >
                                                        {assessment.aggregate_reliability_assessment.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        )
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Third Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Estimated Membership
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2">X</th>
                            <th className="px-4 py-2">Z</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estimated_membership.map((value: any, idx: number) => {
                            const [x, z] = Object.entries(value)[0];
                            return (
                                <tr
                                    key={idx}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="border px-4 py-2">x{idx} = {parseFloat(x).toFixed(1)}</td>
                                    <td className="border px-4 py-2">z{idx} = {parseFloat(z).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Fourth Level Results */}
            <div className="text-center space-y-4">
                <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Aggregated Membership
                    </h5>
                    <b className="text-xl text-blue-600 dark:text-blue-400">
                        {aggregated_membership.toFixed(2)}
                    </b>
                </div>
                <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Security Level
                    </h5>
                    <b className="text-xl text-blue-600 dark:text-blue-400">{security_level}</b>
                </div>
            </div>
        </div>
    );
}
