'use client';

import { useState } from "react";
import EvaluationCard from "@/app/components/Evaluations/EvaluationCard";
import {useTranslations} from "next-intl";

export default function Evaluations({ evaluations }: { evaluations: any[] }) {
    const t = useTranslations("EvaluationsPage");
    const [currentPage, setCurrentPage] = useState(1);
    const evaluationsPerPage = 20;

    const startIndex = (currentPage - 1) * evaluationsPerPage;
    const currentEvaluations = evaluations.slice(startIndex, startIndex + evaluationsPerPage);

    const totalPages = Math.ceil(evaluations.length / evaluationsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                {t("titles.evaluations")}
            </h1>
            <div className="space-y-4">
                {currentEvaluations.map((evaluation) => (
                    <EvaluationCard key={evaluation.id} evaluation={evaluation} />
                ))}
            </div>
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
        </div>
    );
}
