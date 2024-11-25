'use client';

import EvaluationGroup from './EvaluationGroup';

export default function EvaluationList() {
    const evaluations = ["effectiveness", "risks", "team", "financialFeasibility"];

    return (
        <div className="evaluation-list grid gap-6">
            {evaluations.map((evaluation) => (
                <EvaluationGroup key={evaluation} evaluation={evaluation} />
            ))}
        </div>
    );
}
