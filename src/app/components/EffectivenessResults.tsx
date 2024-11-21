export default function EffectivenessResults({ effectiveness }: { effectiveness: any }) {
    const {
        membership_actual,
        membership_desired,
        membership_u,
        max_membership,
        aggregated_score,
        linguistic
    } = effectiveness;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Effectiveness Results
            </h2>

            {/* First Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Membership Actual and Desired
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2">G</th>
                        <th className="px-4 py-2">Membership Actual</th>
                        <th className="px-4 py-2">Membership Desired</th>
                    </tr>
                    </thead>
                    <tbody>
                    {membership_actual.map((value: number, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="border px-4 py-2">G{index + 1}</td>
                            <td className="border px-4 py-2">{value.toFixed(2)}</td>
                            <td className="border px-4 py-2">{membership_desired[index]?.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Second Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Membership U
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2">G</th>
                        <th className="px-4 py-2">Membership U</th>
                    </tr>
                    </thead>
                    <tbody>
                    {membership_u.map((u: any, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="border px-4 py-2">G{index + 1}</td>
                            <td className="border px-4 py-2">
                                {Object.entries(u)
                                    .map(([key, value]) => `U${index + 1}${key} = ${value.toFixed(2)}`)
                                    .join(', ')}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Third Level Results */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Max Membership
                </h3>
                <table className="table-auto w-full text-center border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2">G</th>
                        <th className="px-4 py-2">Max Membership</th>
                    </tr>
                    </thead>
                    <tbody>
                    {max_membership.map((value: number, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="border px-4 py-2">G{index + 1}</td>
                            <td className="border px-4 py-2">{value.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Final Level Results */}
            <div className="text-center space-y-4">
                <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Aggregated Score
                    </h5>
                    <b className="text-xl text-blue-600 dark:text-blue-400">{aggregated_score.toFixed(2)}</b>
                </div>
                <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Linguistic Evaluation
                    </h5>
                    <b className="text-xl text-blue-600 dark:text-blue-400">{linguistic}</b>
                </div>
            </div>
        </div>
    );
}
