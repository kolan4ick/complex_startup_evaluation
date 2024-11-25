'use client';

import {useState, useEffect} from 'react';
import {InformationCircleIcon} from '@heroicons/react/24/solid';
import {useTranslations} from "next-intl";
import EvaluationList from "@/app/components/Instructions/EvaluationList";

export default function Instructions() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useTranslations("Instructions");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="p-2 flex items-center gap-2 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <InformationCircleIcon className="w-8 h-8"/>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative w-5/6 max-w-6xl max-h-screen bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700"
                    >
                        <div
                            className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                Instructions
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-xl font-semibold"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(70vh-4rem)]">
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t("welcome")}
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t("functionality.title")}
                            </p>
                            <div>
                                <ul className={"list-disc pl-6"}>
                                    {['1', '2', '3', '4'].map(function (position) {
                                        return <li key={`evaluations-${position}`}>
                                            {t(`functionality.evaluations.${position}`)}
                                        </li>
                                    })}
                                </ul>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t("functionality.startEvaluation")}
                                </p>
                            </div>
                            <EvaluationList/>
                        </div>

                        <div className="p-6 border-t border-gray-300 dark:border-gray-700 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg text-lg font-semibold shadow hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
