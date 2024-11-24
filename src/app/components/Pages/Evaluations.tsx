'use client';

import { useState } from "react";
import EvaluationCard from "@/app/components/Evaluations/EvaluationCard";
import { useTranslations } from "next-intl";
import { getEvaluations } from "@/hooks/useEvaluation";
import { useAppSelector } from "@/lib/hooks";

export default function Evaluations({ evaluations: initialEvaluations, totalPages }: { evaluations: any[], totalPages: number }) {
    const t = useTranslations("EvaluationsPage");
    const [currentPage, setCurrentPage] = useState(1);
    const [evaluations, setEvaluations] = useState(initialEvaluations);
    const [isLoading, setIsLoading] = useState(false);
    const token = useAppSelector((state) => state.auth.token);

    console.log(totalPages);

    const fetchEvaluations = async (page: number) => {
        setIsLoading(true);
        try {
            const data = await getEvaluations({
                token,
                page,
                perPage: 20,
                reverse: true,
            });

            setEvaluations(data.evaluations);
        } catch (error) {
            console.error("Failed to fetch evaluations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            fetchEvaluations(page).then();
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                {t("titles.evaluations")}
            </h1>

            {isLoading ? (
                <div className="flex justify-center items-center">
                    <p className="text-gray-500 dark:text-gray-300">{t("loading")}</p>
                </div>
            ) : evaluations.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <p className="text-lg text-gray-500 dark:text-gray-300 mb-4">{t("emptyMessage")}</p>
                    <svg
                        className="w-16 h-16 text-gray-400 dark:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 10H7a2 2 0 01-2-2V6a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v14a2 2 0 01-2 2z" />
                    </svg>
                </div>
            ) : (
                <div className="space-y-4">
                    {evaluations.map((evaluation) => (
                        <EvaluationCard key={evaluation.id} evaluation={evaluation} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center space-x-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg shadow-md transition ${
                            currentPage === 1
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                        }`}
                    >
                        {t("pagination.previous")}
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToPage(idx + 1)}
                            className={`px-3 py-1 rounded-lg shadow-md transition ${
                                currentPage === idx + 1
                                    ? "bg-blue-700 dark:bg-blue-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                            }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg shadow-md transition ${
                            currentPage === totalPages
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                        }`}
                    >
                        {t("pagination.next")}
                    </button>
                </div>
            )}
        </div>
    );
}
