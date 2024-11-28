import { TArray } from "ts-interface-checker";
import { ResultSection } from "@/app/components/Evaluations/Results/ResultSection";
import { SummaryCard } from "@/app/components/Evaluations/Results/SummaryCard";
import { useTranslations } from "use-intl";

export default function EffectivenessResults({effectiveness}: { effectiveness: any }) {
    const t = useTranslations("EvaluationForm");

    const {
        membership_actual,
        membership_desired,
        membership_u,
        max_membership,
        aggregated_score,
        linguistic,
    } = effectiveness;

    const sections = [
        {
            title: t("results.effectiveness.membership_actual_desired"),
            icon: "📊",
            description: t("results.effectiveness.membership_actual_desired_description"),
            headers: [
                t("results.effectiveness.headers.group"),
                t("results.effectiveness.headers.membership_actual"),
                t("results.effectiveness.headers.membership_desired"),
            ],
            rows: membership_actual.map((value: number, index: number) => ({
                col1: {value: `G${index + 1}`},
                col2: {value: value.toFixed(2)},
                col3: {value: membership_desired[index]?.toFixed(2)}
            }))
        },
        {
            title: t("results.effectiveness.membership_u"),
            icon: "🔗",
            description: t("results.effectiveness.membership_u_description"),
            headers: [t("results.effectiveness.headers.group"), t("results.effectiveness.headers.membership_u")],
            rows: membership_u.map((u: TArray, index: number) => ({
                col1: {value: `G${index + 1}`},
                col2: {
                    value: Object.entries(u)
                        .map(([key, value]) => `U${index + 1}${key} = ${value.toFixed(2)}`)
                        .join(", "),
                },
            })),
        },
        {
            title: t("results.effectiveness.max_membership"),
            icon: "📈",
            description: t("results.effectiveness.max_membership_description"),
            headers: [t("results.effectiveness.headers.group"), t("results.effectiveness.headers.max_membership")],
            rows: max_membership.map((value: number, index: number) => ({
                col1: {value: `G${index + 1}`},
                col2: {value: value.toFixed(2)}
            }))
        }
    ];

    return (
        <div className="p-4 md:p-6 bg-gradient-to-b from-blue-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4 md:mb-6">
                {t("results.effectiveness.title")}
            </h2>

            {/* Main Layout */}
            <div className="grid gap-6 md:gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {sections.slice(0, 2).map((section, index) => (
                        <ResultSection
                            key={index}
                            title={section.title}
                            icon={section.icon}
                            description={section.description}
                            headers={section.headers}
                            rows={section.rows}
                        />
                    ))}
                </div>
                <div className="flex justify-center">
                    <div className="w-full lg:w-2/3 xl:w-1/2">
                        <ResultSection
                            title={sections[2].title}
                            icon={sections[2].icon}
                            description={sections[2].description}
                            headers={sections[2].headers}
                            rows={sections[2].rows}
                        />
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-6 md:mt-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t("results.summary")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SummaryCard
                        title={t("results.effectiveness.aggregated_score")}
                        value={aggregated_score.toFixed(2)}
                        progress={aggregated_score}
                        color="bg-green-500"
                        icon="🏆"
                    />
                    <SummaryCard
                        title={t("results.linguistic")}
                        value={linguistic}
                        progress={aggregated_score}
                        color="bg-blue-500"
                        icon="🗣️"
                    />
                </div>
            </div>
        </div>
    );
}
