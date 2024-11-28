export function ResultSection({
                                  title,
                                  icon,
                                  description,
                                  headers,
                                  rows,
                              }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4 sm:p-6 space-y-4">
            <div className="flex items-start space-x-3">
                {icon && <span className="text-3xl">{icon}</span>}
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
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium uppercase text-center"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            {Object.entries(row).map(([key, cell], colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-2 sm:px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 text-center text-xs sm:text-sm"
                                    colSpan={cell?.colSpan}
                                    rowSpan={cell?.rowSpan}
                                >
                                    {cell?.value ?? "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
