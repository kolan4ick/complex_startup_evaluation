import Link from "next/link";
import {
    FaCalendarAlt,
    FaUsers,
    FaProjectDiagram,
    FaStar,
    FaBalanceScale,
} from "react-icons/fa";
import {useTranslations} from "next-intl";

export default function EvaluationCard({evaluation}: { evaluation: any }) {
    const t = useTranslations("EvaluationsPage");

    const {
        id,
        order,
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
            <div
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform-gpu hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                        {t("titles.evaluation")} #{order}
                    </h2>
                    <span
                        className="text-sm sm:text-base text-gray-500 dark:text-gray-400 flex items-center mt-2 sm:mt-0">
                        <FaCalendarAlt className="mr-2 w-4 h-4 sm:w-5 sm:h-5"/>
                        {new Date(created_at).toLocaleDateString()}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaBalanceScale className="mr-2 text-blue-500 w-5 h-5"/>
                        <span className="flex-1">
                          <span className="font-medium">{t("feasibility_linguistic")}:</span>
                          <span className="ml-2 text-gray-800 dark:text-gray-200">
                            {t(`feasibility_linguistics.${feasibility_linguistic}`)}
                          </span>
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaUsers className="mr-2 text-green-500 w-5 h-5"/>
                        <span className="flex-1">
                          <span className="font-medium">{t("team_competencies")}:</span>
                          <span className="ml-2 text-gray-800 dark:text-gray-200">
                            {team_competencies || "N/A"}
                          </span>
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaProjectDiagram className="mr-2 text-purple-500 w-5 h-5"/>
                        <span className="flex-1">
                          <span className="font-medium">
                            {t("team_competencies_and_experience")}:
                          </span>
                          <span className="ml-2 text-gray-800 dark:text-gray-200">
                            {team_competencies_and_experience || "N/A"}
                          </span>
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaStar className="mr-2 text-yellow-500 w-5 h-5"/>
                        <span className="flex-1">
                          <span className="font-medium">
                            {t("team_leaders_competencies")}:
                          </span>
                          <span className="ml-2 text-gray-800 dark:text-gray-200">
                            {team_leaders_competencies || "N/A"}
                          </span>
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaProjectDiagram className="mr-2 text-indigo-500 w-5 h-5"/>
                        <span className="flex-1">
                          <span className="font-medium">
                            {t("team_professional_activity")}:
                          </span>
                          <span className="ml-2 text-gray-800 dark:text-gray-200">
                            {team_professional_activity || "N/A"}
                          </span>
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaBalanceScale className="mr-2 text-red-500 w-5 h-5"/>
                        <span className="flex-1">
                          <span className="font-medium">{t("team_stability")}:</span>
                          <span className="ml-2 text-gray-800 dark:text-gray-200">
                            {team_stability || "N/A"}
                          </span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
