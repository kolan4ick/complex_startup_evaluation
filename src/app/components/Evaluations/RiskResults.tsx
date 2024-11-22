import React from "react";
import {TArray} from "ts-interface-checker";
import {SummaryCard} from "@/app/components/Evaluations/SummaryCard";
import {ResultSection} from "@/app/components/Evaluations/ResultSection";
import {useTranslations} from "use-intl";

export default function RiskResults({risk}: { risk: any }) {
    const t = useTranslations("EvaluationForm");

    const {
        res_term_estimate,
        aggregated_reliability_assessment,
        estimated_membership,
        aggregated_membership,
        security_level,
    } = risk;

    return (
        <div className="p-6 bg-gradient-to-b from-red-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                {t("results.risk.title")}
            </h2>
            <div className="grid gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ResultSection
                        title={t("results.risk.res_term_estimate")}
                        icon={"📊"}
                        description={t("results.risk.res_term_estimate_description")}
                        headers={[t("results.risk.headers.index"), t("results.risk.headers.term"), t("results.risk.headers.linguistic"), t("results.risk.headers.aggregated_assessment")]}
                        rows={res_term_estimate.flatMap((estimate: any, index: number) => {
                            const headerRow = {
                                col1: {
                                    value: `K${index}`,
                                    colSpan: 4,
                                },
                            };

                            const dataRows = estimate.k.map((value: [string, number], idx: number) => {
                                const row: Record<string, { value: string | number | undefined; rowSpan?: number }> = {
                                    col1: {value: idx + 1},
                                    col2: {value: `K${index}${idx + 1}`},
                                    col3: {value: t(`fields.linguistics.${value[0]}`)}, // Assuming value[0] exists
                                };

                                if (idx === 0 && estimate.aggregated_assessment) {
                                    row.col4 = {
                                        value: t(`fields.linguistics.${estimate.aggregated_assessment}`),
                                        rowSpan: estimate.k.length,
                                    };
                                }

                                return row;
                            });

                            return [headerRow, ...dataRows];
                        })}
                    />
                    <ResultSection
                        title={t("results.risk.aggregated_reliability_assessment")}
                        icon={"📊"}
                        description={t("results.risk.aggregated_reliability_assessment_description")}
                        headers={[t("results.risk.headers.index"), t("results.risk.headers.term"), t("results.risk.headers.linguistic"), t("results.risk.headers.authenticity"), t("results.risk.headers.aggregated_reliability")]}
                        rows={aggregated_reliability_assessment.flatMap((assessment: any, index: number) => {
                            const headerRow = {
                                col1: {
                                    value: `K${index}`,
                                    colSpan: 4,
                                },
                                col2: {
                                    value: t(`fields.linguistics.${res_term_estimate[index].aggregated_assessment}`)
                                }
                            };

                            const dataRows = assessment.k.map((value: [string, number], idx: number) => {
                                const row: Record<string, { value: string | number | undefined; rowSpan?: number }> = {
                                    col1: {value: idx + 1},
                                    col2: {value: `K${index}${idx + 1}`},
                                    col3: {value: t(`fields.linguistics.${value[0]}`)},
                                    col4: {value: value[1]},
                                };

                                if (idx === 0 && assessment.aggregate_reliability_assessment) {
                                    row.col5 = {
                                        value: assessment.aggregate_reliability_assessment.toFixed(2),
                                        rowSpan: assessment.k.length,
                                    };
                                }

                                return row;
                            });

                            return [headerRow, ...dataRows];
                        })}
                    />
                </div>
                <div className="flex justify-center">
                    <div className="w-full md:w-1/2">
                        <ResultSection
                            title={t("results.risk.estimated_membership")}
                            icon={""}
                            description={t("results.risk.estimated_membership_description")}
                            headers={["X", "Z"]}
                            rows={estimated_membership.map((value: TArray, idx: number) => {
                                const [x, z] = Object.entries(value)[0];
                                return {
                                    col1: {
                                        value: `x${idx} = ${(+x).toFixed(2)}`
                                    },
                                    col2: {
                                        value: `z${idx} = ${(+z).toFixed(2)}`
                                    }
                                }
                            })}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t("results.summary")}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SummaryCard
                        title={t("results.risk.aggregated_membership")}
                        value={aggregated_membership.toFixed(2)}
                        progress={aggregated_membership}
                        color="bg-green-500"
                        icon="🏆"
                    />
                    <SummaryCard
                        title={t("results.security_level")}
                        value={security_level}
                        progress={aggregated_membership}
                        color="bg-blue-500"
                        icon="🔒️"
                    />
                </div>
            </div>
        </div>
    );
}
