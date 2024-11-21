export function ResultSection({
                                  title,
                                  icon,
                                  description,
                                  headers,
                                  rows
                              }: {
    title: string;
    icon: string;
    description: string;
    headers: string[];
    rows: { col1: string; col2: string; col3?: string }[];
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4 space-y-4">
            <div className="flex items-center space-x-3">
                <span className="text-3xl">{icon}</span>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-2 text-left text-sm font-medium uppercase"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                                {row.col1}
                            </td>
                            <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                                {row.col2}
                            </td>
                            {row.col3 && (
                                <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                                    {row.col3}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}