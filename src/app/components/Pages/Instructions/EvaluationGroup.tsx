'use client';

import {useTranslations} from "next-intl";

export default function EvaluationGroup({evaluation}: { evaluation: string }) {
    const t = useTranslations("InstructionsPage");

    const getOptionalTranslation = (path: string, defaultValue: any): any => {
        return t.has(path) ? t.raw(path) : defaultValue;
    };

    const header = t(`${evaluation}.header`, {defaultValue: ""});
    const inputs = getOptionalTranslation(`${evaluation}.inputs`, {});
    const conclusion = getOptionalTranslation(`${evaluation}.conclusion`, "");

    const renderInputs = (inputs: any) => {
        return Object.entries(inputs).map(([key, content]: any) => (
            <div key={key} className="mb-4">
                {/* Header for the current input */}
                {content.header && (
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
                        {content.header}
                    </h2>
                )}
                {/* Render nested values if available */}
                {content.values && (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                        {Object.entries(content.values).map(([subKey, subContent]: any) => (
                            <li key={subKey}>
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
                                {/* Recursively render nested inputs */}
                                {subContent.values && renderInputs({ [subKey]: subContent })}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ));
    };

    return (
        <div className="evaluation-group bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 space-y-6">
            {/* Evaluation Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                {t(`evaluations.${evaluation}`)}
            </h1>

            {/* Optional Header */}
            {header && (
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {header}
                </p>
            )}

            {/* Render Inputs */}
            {Object.keys(inputs).length > 0 && (
                <div className="inputs-container space-y-4">{renderInputs(inputs)}</div>
            )}

            {/* Optional Conclusion */}
            {conclusion && (
                <p className="text-gray-600 dark:text-gray-400 italic text-center">
                    {conclusion}
                </p>
            )}
        </div>
    );
}
