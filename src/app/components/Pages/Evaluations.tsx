'use client';

import { useState } from "react";
import EvaluationCard from "@/app/components/Evaluations/EvaluationCard";
import { useTranslations } from "next-intl";
import { getEvaluations } from "@/hooks/useEvaluation";
import { useAppSelector } from "@/lib/hooks";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export default function Evaluations({ evaluations: initialEvaluations, totalPages }: { evaluations: any[], totalPages: number }) {
    const t = useTranslations("EvaluationsPage");
    const [currentPage, setCurrentPage] = useState(1);
    const [evaluations, setEvaluations] = useState(initialEvaluations);
    const [isLoading, setIsLoading] = useState(false);
    const token = useAppSelector((state) => state.auth.token);

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
            fetchEvaluations(page);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
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
                    {evaluations.map((evaluation, index) => (
                        <EvaluationCard
                            key={evaluation.id}
                            evaluation={{
                                ...evaluation,
                                order: (currentPage - 1) * 20 + index + 1, // Calculate the order dynamically
                            }}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-8 flex items-center">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous Page"
                        className={`px-2 py-2 rounded-lg shadow-md transition ${
                            currentPage === 1
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                        }`}
                    >
                        <FaChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 flex md:justify-center overflow-x-auto mx-2 min-w-0">
                        <div className="flex space-x-2">
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
                        </div>
                    </div>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next Page"
                        className={`px-2 py-2 rounded-lg shadow-md transition ${
                            currentPage === totalPages
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                        }`}
                    >
                        <FaChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
