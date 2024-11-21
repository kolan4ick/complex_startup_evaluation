import React from "react";

export default function FinancingFeasibilityResults({ financingFeasibility }: { financingFeasibility: any }) {
    const { cone_shaped_membership, membership, triangle_membership } = financingFeasibility;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Financing Feasibility Results
            </h2>

            {/* Membership Values */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Membership Values
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="border px-4 py-2">Cone-Shaped Membership</td>
                        <td className="border px-4 py-2">{cone_shaped_membership.toFixed(4)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="border px-4 py-2">Membership</td>
                        <td className="border px-4 py-2">{membership.toFixed(4)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="border px-4 py-2">Triangle Membership</td>
                        <td className="border px-4 py-2">{triangle_membership.toFixed(4)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
