'use client';

import EffectivenessResults from "@/app/components/Evaluations/Results/EffectivenessResults";
import RiskResults from "@/app/components/Evaluations/Results/RiskResults";
import TeamResults from "@/app/components/Evaluations/Results/TeamResults";
import FinancingFeasibilityResults from "@/app/components/Evaluations/Results/FinancingFeasibilityResults";
import ResultPdfButton from "@/app/components/Evaluations/Results/ResultPdfButton";

export default function Results({ results }: { results: any }) {
    return (
        <>
            <div className="mt-8">
                <EffectivenessResults effectiveness={results.effectiveness}/>
            </div>
            <div className="mt-8">
                <RiskResults risk={results.risk}/>
            </div>
            <div className="mt-8">
                <TeamResults team={results.team}/>
            </div>
            <div className="mt-8">
                <FinancingFeasibilityResults financingFeasibility={results.financing_feasibility}/>
            </div>
        </>
    )
}