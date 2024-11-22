import Link from "next/link";
import { FaCalendarAlt, FaUsers, FaProjectDiagram, FaStar, FaBalanceScale } from "react-icons/fa";

export default function EvaluationCard({ evaluation }: { evaluation: any }) {
    const {
        id,
        created_at,
        feasibility_linguistic,
        team_competencies,
        team_competencies_and_experience,
        team_leaders_competencies,
        team_professional_activity,
        team_stability,
    } = evaluation;

    return (
        <Link href={`/evaluations/${id}`} className="block">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform-gpu hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        Evaluation #{id}
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        {new Date(created_at).toLocaleDateString()}
                    </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaBalanceScale className="mr-2 text-blue-500" />
                        Feasibility Linguistic:
                        <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                            {feasibility_linguistic || "Unknown"}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaUsers className="mr-2 text-green-500" />
                        Team Competencies:
                        <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                            {team_competencies || "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaProjectDiagram className="mr-2 text-purple-500" />
                        Competencies & Experience:
                        <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                            {team_competencies_and_experience || "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaStar className="mr-2 text-yellow-500" />
                        Leaders Competencies:
                        <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                            {team_leaders_competencies || "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaProjectDiagram className="mr-2 text-indigo-500" />
                        Professional Activity:
                        <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                            {team_professional_activity || "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaBalanceScale className="mr-2 text-red-500" />
                        Team Stability:
                        <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">
                            {team_stability || "N/A"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
