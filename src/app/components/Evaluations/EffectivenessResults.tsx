import {TArray} from "ts-interface-checker";
import {ResultSection} from "@/app/components/Evaluations/ResultSection";
import {SummaryCard} from "@/app/components/Evaluations/SummaryCard";
import {useTranslations} from "use-intl";

export default function EffectivenessResults({effectiveness}: { effectiveness: any }) {
    const t = useTranslations("EvaluationForm");

    const {
        membership_actual,
        membership_desired,
        membership_u,
        max_membership,
        aggregated_score,
        linguistic
    } = effectiveness;

    // Array of sections
    const sections = [
        {
            title: t("results.effectiveness.membership_actual_desired"),
            icon: "📊",
            description: t("results.effectiveness.membership_actual_desired_description"),
            headers: [
                t("results.effectiveness.headers.group"),
                t("results.effectiveness.headers.membership_actual"),
                t("results.effectiveness.headers.membership_desired")
            ],
            rows: membership_actual.map((value: number, index: number) => ({
                col1: `G${index + 1}`,
                col2: value.toFixed(2),
                col3: membership_desired[index]?.toFixed(2)
            }))
        },
        {
            title: t("results.effectiveness.membership_u"),
            icon: "🔗",
            description: t("results.effectiveness.membership_u_description"),
            headers: [t("results.effectiveness.headers.group"), t("results.effectiveness.headers.membership_u")],
            rows: membership_u.map((u: TArray, index: number) => ({
                col1: `G${index + 1}`,
                col2: Object.entries(u)
                    .map(([key, value]) => `U${index + 1}${key} = ${value.toFixed(2)}`)
                    .join(", ")
            }))
        },
        {
            title: t("results.effectiveness.max_membership"),
            icon: "📈",
            description: t("results.effectiveness.max_membership_description"),
            headers: [t("results.effectiveness.headers.group"), t("results.effectiveness.headers.max_membership")],
            rows: max_membership.map((value: number, index: number) => ({
                col1: `G${index + 1}`,
                col2: value.toFixed(2)
            }))
        }
    ];

    return (
        <div
            className="p-6 bg-gradient-to-b from-blue-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                {t("results.effectiveness.title")}
            </h2>

            {/* Main Layout */}
            <div className="grid gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <div className="w-full md:w-1/2">
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
            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t("results.effectiveness.summary")}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SummaryCard
                        title={t("results.effectiveness.aggregated_score")}
                        value={aggregated_score.toFixed(2)}
                        progress={aggregated_score}
                        color="bg-green-500"
                        icon="🏆"
                    />
                    <SummaryCard
                        title={t("results.effectiveness.linguistic")}
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
