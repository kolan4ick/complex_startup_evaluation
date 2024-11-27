'use client';

import { resultPdf } from "@/hooks/useEvaluation";
import { useAppSelector } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import { FaFilePdf } from "react-icons/fa";

interface ResultPdfButtonProps {
    evaluationId: string;
}

export default function ResultPdfButton({ evaluationId }: ResultPdfButtonProps) {
    const token = useAppSelector((state) => state.auth.token);
    const t = useTranslations("EvaluationForm");

    const handleDownloadPdf = async () => {
        try {
            const response = await resultPdf({
                id: evaluationId,
                token: token
            });

            const url = URL.createObjectURL(response.data);

            window.open(url, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 10000);
        } catch (error) {
            console.error(t("error"), error);
            alert(t("titles.downloadError"));
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={handleDownloadPdf}
                className="relative flex items-center justify-center gap-2 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-110 group"
            >
                <FaFilePdf className="text-2xl" />
                <div
                    className="absolute bottom-20 right-0 bg-gray-700 dark:bg-gray-200 text-gray-100 dark:text-gray-900 text-sm px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 w-48 text-center shadow-lg pointer-events-none"
                >
                    {t("titles.downloadButtonText")}
                </div>
            </button>
        </div>
    );
}
