'use client';

export default function Team({ register }: any) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-8">
            <h2 className="text-xl font-semibold text-center">Team Evaluation</h2>

            {/* Team Stability */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Team Stability</h3>

                {/* Team Stability Field */}
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Team Stability"
                        {...register('evaluation.team_stability')}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Team Stability Scores */}
                {Array.from({ length: 2 }, (_, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`evaluation.team_stability_scores.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Confidence"
                            {...register(`evaluation.team_stability_scores.${index}.confidence`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder="Weight"
                            {...register(`evaluation.team_stability_scores.${index}.weight`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Team Professional Competency */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Team Professional Competency</h3>

                {/* Team Fields */}
                {[
                    { name: 'team_competencies', label: 'Team Competencies' },
                    { name: 'team_competencies_and_experience', label: 'Competencies and Experience' },
                    { name: 'team_leaders_competencies', label: 'Leaders Competencies' },
                ].map((field) => (
                    <div key={field.name} className="mb-4">
                        <input
                            type="number"
                            placeholder={field.label}
                            {...register(`evaluation.${field.name}`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}

                {/* Professional Competency Scores */}
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`evaluation.team_professional_competency_scores.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Confidence"
                            {...register(`evaluation.team_professional_competency_scores.${index}.confidence`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder="Weight"
                            {...register(`evaluation.team_professional_competency_scores.${index}.weight`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Team Professional Activity */}
            <div className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Team Professional Activity</h3>

                {/* Team Professional Activity Field */}
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Team Professional Activity"
                        {...register('evaluation.team_professional_activity')}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Professional Activity Scores */}
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Linguistic"
                            {...register(`evaluation.team_professional_activity_scores.${index}.linguistic`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={0.01}
                            placeholder="Confidence"
                            {...register(`evaluation.team_professional_activity_scores.${index}.confidence`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="number"
                            step={1}
                            placeholder="Weight"
                            {...register(`evaluation.team_professional_activity_scores.${index}.weight`)}
                            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
