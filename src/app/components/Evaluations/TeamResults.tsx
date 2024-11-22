import { ResultSection } from "@/app/components/Evaluations/ResultSection";
import { SummaryCard } from "@/app/components/Evaluations/SummaryCard";
import { useTranslations } from "use-intl";

export default function TeamResults({ team }: { team: any }) {
    const { membership, defuzzification, rate } = team;
    const t = useTranslations("EvaluationForm");

    // Prepare sections data
    const sections = [
        {
            title: t("results.team.membership"),
            icon: "📊",
            description: t("results.team.membership_description"),
            headers: [
                t("results.team.headers.index"),
                t("results.team.headers.term"),
                t("results.team.headers.membership")
            ],
            rows: membership.flatMap((kArray: number[], index: number) => {
                const headerRow = {
                    col1: {
                        value: `K${index + 1}`,
                        colSpan: 3,
                    },
                };

                const dataRows = kArray.map((value: number, idx: number) => ({
                    col1: { value: idx + 1 },
                    col2: { value: `K${index + 1}${idx + 1}` },
                    col3: { value: value.toFixed(3) },
                }));

                return [headerRow, ...dataRows];
            }),
        },
    ];

    return (
        <div
            className="p-6 bg-gradient-to-b from-green-100 via-yellow-200 to-yellow-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                {t("results.team.title")}
            </h2>

            <div className="grid gap-8">
                {sections.map((section, index) => (
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

            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t("results.summary")}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SummaryCard
                        title={t("results.team.defuzzification")}
                        value={defuzzification.toFixed(4)}
                        progress={defuzzification}
                        color="bg-green-500"
                        icon="📈"
                    />
                    <SummaryCard
                        title={t("results.team.rate")}
                        value={rate}
                        progress={defuzzification}
                        color="bg-blue-500"
                        icon="🌟"
                    />
                </div>
            </div>
        </div>
    );
}
