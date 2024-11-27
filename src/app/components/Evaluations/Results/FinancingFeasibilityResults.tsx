import { SummaryCard } from "@/app/components/Evaluations/Results/SummaryCard";
import { useTranslations } from "use-intl";

export default function FinancingFeasibilityResults({ financingFeasibility }: { financingFeasibility: any }) {
    const t = useTranslations("EvaluationForm");

    const { cone_shaped_membership, membership, triangle_membership } = financingFeasibility;

    return (
        <div
            className="p-6 bg-gradient-to-b from-purple-100 via-pink-200 to-pink-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                {t("results.financing.title")}
            </h2>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t("results.financing.memberships")}
                </h3>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
                    <SummaryCard
                        title={t("results.financing.cone_shaped_membership")}
                        value={cone_shaped_membership.toFixed(4)}
                        progress={cone_shaped_membership}
                        color="bg-blue-500"
                        icon="🔺"
                    />
                    <SummaryCard
                        title={t("results.financing.membership")}
                        value={membership.toFixed(4)}
                        progress={membership}
                        color="bg-purple-500"
                        icon="⚙️"
                    />
                </div>
            </div>
            <div className={"mt-8"}>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t("results.summary")}
                </h3>
                {triangle_membership.map((triangle: { value: number; linguistic: string; }, index: number) => (
                    <div className={"mt-4"} key={index}>
                        {
                            triangle_membership.length > 1 &&
                            <h3 className={"font-bold text-gray-800 dark:text-gray-100 mb-4"}>
                                {t("results.financing.triangle_membership")} - {t(`results.financing.triangle_memberships.${index + 1}`)}
                            </h3>
                        }
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <SummaryCard
                                title={`${t("results.financing.triangle_membership")}`}
                                value={triangle.value.toFixed(4)}
                                progress={triangle.value}
                                color="bg-green-500"
                                icon="🔻"
                            />
                            <SummaryCard
                                title={`${t("results.financing.triangle_membership_linguistic")}`}
                                value={triangle.linguistic}
                                progress={triangle.value}
                                color="bg-yellow-500"
                                icon="📝"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
