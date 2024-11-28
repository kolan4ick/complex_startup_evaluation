export function SummaryCard({
                                title,
                                value,
                                progress,
                                color,
                                icon,
                            }: {
    title: string;
    value: string;
    progress: number;
    color: string;
    icon: string;
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl md:text-3xl">{icon}</span>
                <h4 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {title}
                </h4>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {value}
            </p>
            <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    className={`${color} h-2 rounded-full`}
                    style={{ width: `${progress * 100}%` }}
                ></div>
            </div>
        </div>
    );
}
