'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import {useLocale} from "use-intl";

export default function EvaluationGroup({ evaluation }: { evaluation: string }) {
    const t = useTranslations("InstructionsPage");

    const getOptionalTranslation = (path: string, defaultValue: any): any => {
        return t.has(path) ? t.raw(path) : defaultValue;
    };

    const header = t.rich(`${evaluation}.header`, {
        link: (chunks) => (
            <Link
                href={`/questionnaire_${useLocale()}.pdf`}
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
            >
                {chunks}
            </Link>
        ),
    });
    const inputs = getOptionalTranslation(`${evaluation}.inputs`, {});
    const conclusion = getOptionalTranslation(`${evaluation}.conclusion`, "");

    const renderInputs = (inputs: any) => {
        return Object.entries(inputs).map(([key, content]: any) => (
            <div key={key} className="mb-6">
                {content.header && (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-red-500">📌</span>
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                            {content.header}
                        </h3>
                    </div>
                )}
                {content.values && (
                    <ul
                        className={`${
                            Object.values(content.values).some((subContent: any) => subContent.values)
                                ? ""
                                : "list-disc"
                        } list-inside text-gray-700 dark:text-gray-300 ml-6`}
                    >
                        {Object.entries(content.values).map(([subKey, subContent]: any) => (
                            <li key={subKey} className="mb-2">
                                {subContent.title && (
                                    <strong className="text-gray-800 dark:text-gray-100">
                                        {subContent.title}:{" "}
                                    </strong>
                                )}
                                {subContent.value && (
                                    <span className="text-gray-600 dark:text-gray-300">
                        {subContent.value}
                    </span>
                                )}
                                {subContent.values && renderInputs({ [subKey]: subContent })}
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        ));
    };

    return (
        <div className="evaluation-group bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8 space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {t(`evaluations.${evaluation}`)}
                </h1>
            </div>

            {header && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                    <p className="text-lg text-gray-700 dark:text-gray-300">{header}</p>
                </div>
            )}

            {Object.keys(inputs).length > 0 && (
                <div className="inputs-container">
                    {renderInputs(inputs)}
                </div>
            )}

            {conclusion && (
                <div className="conclusion-container bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                    <p className="text-gray-600 dark:text-gray-300 italic">{conclusion}</p>
                </div>
            )}
        </div>
    );
}
