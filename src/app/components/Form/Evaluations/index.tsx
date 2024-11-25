import { useTranslations } from "use-intl";
import { useAppSelector } from "@/lib/hooks";
import {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { createEvaluation } from "@/hooks/useEvaluation";
import Effectiveness from "@/app/components/Form/Evaluations/Effectiveness";
import Risk from "@/app/components/Form/Evaluations/Risk";
import Team from "@/app/components/Form/Evaluations/Team";
import EffectivenessResults from "@/app/components/Evaluations/EffectivenessResults";
import RiskResults from "@/app/components/Evaluations/RiskResults";
import TeamResults from "@/app/components/Evaluations/TeamResults";
import FinancingFeasibilityResults from "@/app/components/Evaluations/FinancingFeasibilityResults";

export default function EvaluationForm({ evaluation, result }: { evaluation?: any; result?: any }) {
    const token = useAppSelector((state) => state.auth.token);
    const t = useTranslations("EvaluationForm");
    const [submissionResult, setSubmissionResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false); // State for loading

    const submitButtonRef = useRef<HTMLButtonElement>(null);

    let defaultValues;

    if (evaluation) {
        const renameArraysToAttributes = (data: { [s: string]: unknown } | ArrayLike<unknown>) => {
            return Object.fromEntries(
                Object.entries(data).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return [`${key}_attributes`, value];
                    }
                    return [key, value];
                })
            );
        };

        defaultValues = renameArraysToAttributes(evaluation);
    } else {
        defaultValues = {
            team_competencies: 8,
            team_competencies_and_experience: 9,
            team_leaders_competencies: 10,
            team_professional_activity: 8,
            team_stability: 10,
            feasibility_linguistic: 4,
            effectiveness_sum_scores_attributes: [
                { value: 78.0 },
                { value: 45.0 },
                { value: 30.0 },
                { value: 186.0 },
                { value: 63.0 },
            ],
            effectiveness_min_scores_attributes: [
                { value: 20.0 },
                { value: 15.0 },
                { value: 10.0 },
                { value: 50.0 },
                { value: 25.0 },
            ],
            effectiveness_max_scores_attributes: [
                { value: 115.0 },
                { value: 60.0 },
                { value: 50.0 },
                { value: 225.0 },
                { value: 90.0 },
            ],
            effectiveness_desired_scores_attributes: [
                { value: 80.0 },
                { value: 55.0 },
                { value: 35.0 },
                { value: 165.0 },
                { value: 50.0 },
            ],
            effectiveness_weight_scores_attributes: [
                { value: 10 },
                { value: 8 },
                { value: 6 },
                { value: 7 },
                { value: 4 },
            ],
            risk_financial_scores_attributes: [
                { linguistic: "middle", authenticity: 0.8 },
                { linguistic: "low", authenticity: 0.9 },
                { linguistic: "middle", authenticity: 0.1 },
                { linguistic: "above_middle", authenticity: 0.7 },
                { linguistic: "middle", authenticity: 0.6 },
            ],
            risk_investment_scores_attributes: [
                { linguistic: "low", authenticity: 0.2 },
                { linguistic: "low", authenticity: 0.8 },
                { linguistic: "above_middle", authenticity: 0.4 },
                { linguistic: "low", authenticity: 0.6 },
                { linguistic: "above_middle", authenticity: 0.7 },
            ],
            risk_operational_scores_attributes: [
                { linguistic: "below_middle", authenticity: 0.8 },
                { linguistic: "below_middle", authenticity: 0.7 },
                { linguistic: "below_middle", authenticity: 0.4 },
                { linguistic: "below_middle", authenticity: 0.3 },
                { linguistic: "below_middle", authenticity: 0.9 },
                { linguistic: "below_middle", authenticity: 0.4 },
                { linguistic: "middle", authenticity: 0.6 },
                { linguistic: "above_middle", authenticity: 0.8 },
                { linguistic: "middle", authenticity: 0.1 },
            ],
            risk_innovation_activity_scores_attributes: [
                { linguistic: "low", authenticity: 0.8 },
                { linguistic: "low", authenticity: 0.9 },
                { linguistic: "below_middle", authenticity: 0.1 },
                { linguistic: "below_middle", authenticity: 0.7 },
                { linguistic: "below_middle", authenticity: 0.6 },
            ],
            team_stability_scores_attributes: [
                { linguistic: "high", confidence: 0.8, weight: 8 },
                { linguistic: "below_middle", confidence: 0.9, weight: 9 },
            ],
            team_professional_competency_scores_attributes: [
                { linguistic: "high", confidence: 0.7, weight: 8 },
                { linguistic: "high", confidence: 0.8, weight: 10 },
                { linguistic: "middle", confidence: 0.6, weight: 9 },
                { linguistic: "middle", confidence: 0.5, weight: 10 },
                { linguistic: "middle", confidence: 0.7, weight: 7 },
            ],
            team_professional_activity_scores_attributes: [
                { linguistic: "below_middle", confidence: 0.8, weight: 8 },
                { linguistic: "high", confidence: 0.9, weight: 6 },
                { linguistic: "middle", confidence: 0.9, weight: 7 },
                { linguistic: "below_middle", confidence: 0.8, weight: 9 },
            ],
        };
    }

    const { register, handleSubmit } = useForm({
        defaultValues,
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true); // Start loading
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
            const response = await createEvaluation({ params: data, token: token });
            setSubmissionResult(response);
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmissionResult({ error: "Submission failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
            submitButtonRef.current?.scrollIntoView({ behavior: "smooth" });
        };
    }, [isLoading]);

    useEffect(() => {
        if (result) {
            setSubmissionResult(result);
        }
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Effectiveness register={register} />
                <Risk register={register} />
                <Team register={register} />
                <button
                    id="EvaluationSubmitButton"
                    ref={submitButtonRef}
                    type="submit"
                    className="w-full bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
                >
                    {t("buttons.submit")}
                </button>
            </form>

            {submissionResult && submissionResult.effectiveness && submissionResult.risk && submissionResult.team && (
                <div
                    tabIndex={-1}
                    className="outline-none mt-8"
                >
                    <div className="mt-8">
                        <EffectivenessResults effectiveness={submissionResult.effectiveness} />
                    </div>
                    <div className="mt-8">
                        <RiskResults risk={submissionResult.risk} />
                    </div>
                    <div className="mt-8">
                        <TeamResults team={submissionResult.team} />
                    </div>
                    <div className="mt-8">
                        <FinancingFeasibilityResults financingFeasibility={submissionResult.financing_feasibility} />
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-100 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 border-4 border-t-blue-600 dark:border-t-blue-600 border-gray-300 dark:border-gray-600 rounded-full animate-spin"></div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t("loading")}
                        </h3>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            {t("loading_message", { duration: "a few seconds" })}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
