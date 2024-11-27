'use client';

import {resultPdf} from "@/hooks/useEvaluation";
import {useAppSelector} from "@/lib/hooks";

interface ResultPdfButtonProps {
    evaluationId: string;
}

export default function ResultPdfButton({ evaluationId }: ResultPdfButtonProps) {
    const token = useAppSelector((state) => state.auth.token);

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
            console.error("Error downloading the PDF:", error);
            alert("Failed to download the PDF. Please try again later.");
        }
    };

    return (
        <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
            Download PDF
        </button>
    );
}
