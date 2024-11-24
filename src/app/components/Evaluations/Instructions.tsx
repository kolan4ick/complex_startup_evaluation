'use client';

import { useState, useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

export default function Instructions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <InformationCircleIcon className="w-8 h-8" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative w-5/6 max-w-6xl max-h-screen bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-gray-700">
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
                                Here are the detailed instructions for using this application. These instructions are comprehensive and intended to guide you through all the necessary steps to maximize the application's functionality.
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mt-4 space-y-2">
                                <li>Step 1: Start by reviewing the form below and ensuring all fields are accurate.</li>
                                <li>Step 2: Fill out the required fields carefully and ensure no mistakes.</li>
                                <li>Step 3: Submit the form to evaluate the results.</li>
                                <li>Step 4: Review the results provided and use them to make informed decisions.</li>
                                <li>Step 5: If necessary, edit the form and resubmit for updated evaluations.</li>
                                <li>Step 6: Save or export the results for your records.</li>
                            </ul>
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
