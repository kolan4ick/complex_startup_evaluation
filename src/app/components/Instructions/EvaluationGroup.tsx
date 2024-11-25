'use client';

import {useTranslations} from "next-intl";

export default function EvaluationGroup({evaluation}: { evaluation: string }) {
    const t = useTranslations("Instructions");
    const getOptionalTranslation = (path: string, defaultValue: any): any => {
        if (t.has(path)) {
            return t.raw(path);
        } else {
            return defaultValue;
        }
    };

    const header = t(`${evaluation}.header`, {defaultValue: ""});
    const inputs = getOptionalTranslation(`${evaluation}.inputs`, {});
    const conclusion = getOptionalTranslation(`${evaluation}.conclusion`, "");

    const renderInputs = (inputs: any) => {
        return Object.entries(inputs).map(([key, content]: any) => (
            <div key={key} className="mb-6">
                {/* Render the header only once for the current level */}
                {content.header && <h2 className="font-semibold text-md">{content.header}</h2>}
                {content.values && (
                    <ul className="list-disc ml-6 mt-2">
                        {Object.entries(content.values).map(([subKey, subContent]: any) => (
                            <li key={subKey}>
                                {/* Only render title or value of the subContent */}
                                {subContent.title && <strong>{subContent.title}: </strong>}
                                {subContent.value && <p>{subContent.value}</p>}
                                {/* Recursively render nested values if present */}
                                {subContent.values && renderInputs({ [subKey]: subContent })}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ));
    };


    return (
        <div className="evaluation-group border p-4 rounded-lg shadow">
            <h1 className="text-center font-bold text-lg mb-4">{t(`evaluations.${evaluation}`)}</h1>

            {/* Optional Header */}
            {header && <p className="mb-4 text-gray-600">{header}</p>}

            {/* Render Inputs */}
            {Object.keys(inputs).length > 0 && <div>{renderInputs(inputs)}</div>}

            {/* Optional Conclusion */}
            {conclusion && <p className="text-gray-600 italic mt-4">{conclusion}</p>}
        </div>
    );
}
