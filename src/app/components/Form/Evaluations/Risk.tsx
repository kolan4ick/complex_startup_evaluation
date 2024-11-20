'use client';

export default function Risk({ register }: any) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-8">
            <h2 className="text-xl font-semibold text-center">Risk Evaluation</h2>

            {/* Operational Risks */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Operational Risks</h3>
                {Array.from({ length: 9 }, (_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`risk_operational_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Authenticity"
                            {...register(`risk_operational_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Investment Risks */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Investment Risks</h3>
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`risk_investment_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Authenticity"
                            {...register(`risk_investment_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Financial Risks */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Financial Risks</h3>
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`risk_financial_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Authenticity"
                            {...register(`risk_financial_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Innovation Risks */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Innovation Risks</h3>
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`risk_innovation_activity_scores_attributes.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Authenticity"
                            {...register(`risk_innovation_activity_scores_attributes.${index}.authenticity`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
