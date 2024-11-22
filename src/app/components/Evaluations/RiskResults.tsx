import React from "react";
import {TArray} from "ts-interface-checker";
import {SummaryCard} from "@/app/components/Evaluations/SummaryCard";
import {ResultSection} from "@/app/components/Evaluations/ResultSection";

export default function RiskResults({risk}: { risk: any }) {
    const {
        res_term_estimate,
        aggregated_reliability_assessment,
        estimated_membership,
        aggregated_membership,
        security_level,
    } = risk;
    console.log(aggregated_reliability_assessment);
    return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 mb-8 space-y-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                Risk Results
            </h2>
            <div className="grid gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ResultSection
                        title={"Res Term Estimate"}
                        icon={"📊"}
                        description={"asd"}
                        headers={["Index", "K", "Linguistic", "Aggregated Assessment"]}
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
                                    col3: {value: value[0]}, // Assuming value[0] exists
                                };

                                if (idx === 0 && estimate.aggregated_assessment) {
                                    row.col4 = {
                                        value: estimate.aggregated_assessment,
                                        rowSpan: estimate.k.length,
                                    };
                                }

                                return row;
                            });

                            return [headerRow, ...dataRows];
                        })}
                    />
                    <ResultSection
                        title={"Aggregated Reliability Assessment"}
                        icon={"📊"}
                        description={"asd"}
                        headers={["Index", "K", "Linguistic", "Authenticity", "Aggregated Reliability"]}
                        rows={aggregated_reliability_assessment.flatMap((assessment: any, index: number) => {
                            const headerRow = {
                                col1: {
                                    value: `K${index}`,
                                    colSpan: 4,
                                },
                                col2: {
                                    value: res_term_estimate[index].aggregated_assessment
                                }
                            };

                            const dataRows = assessment.k.map((value: [string, number], idx: number) => {
                                const row: Record<string, { value: string | number | undefined; rowSpan?: number }> = {
                                    col1: {value: idx + 1},
                                    col2: {value: `K${index}${idx + 1}`},
                                    col3: {value: value[0]},
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
                            title={"Estimated Membership"}
                            icon={""}
                            description={"A description of the estimated membership details"}
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
                    summary
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SummaryCard
                        title="Aggregated Membership"
                        value={aggregated_membership.toFixed(2)}
                        progress={aggregated_membership}
                        color="bg-green-500"
                        icon="🏆"
                    />
                    <SummaryCard
                        title="Security Level"
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
