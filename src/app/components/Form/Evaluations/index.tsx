'use client';

import {useForm} from 'react-hook-form';
import {useAppSelector} from '@/lib/hooks';
import Effectiveness from "@/app/components/Form/Evaluations/Effectiveness";
import Risk from "@/app/components/Form/Evaluations/Risk";
import Team from "@/app/components/Form/Evaluations/Team";
import {createEvaluation} from "@/hooks/useEvaluation";
import {useTranslations} from "use-intl";

export default function EvaluationForm({evaluation}: { evaluation?: any }) {
    const token = useAppSelector((state) => state.auth.token);
    const t = useTranslations('EvaluationForm');

    let defaultValues;

    if (evaluation) {
        defaultValues = evaluation;
    } else {
        defaultValues = {
            team_competencies: 8,
            team_competencies_and_experience: 9,
            team_leaders_competencies: 10,
            team_professional_activity: 8,
            team_stability: 10,
            feasibility_linguistic: 4,
            effectiveness_sum_scores_attributes: [
                {value: 78.0, order: 1},
                {value: 45.0, order: 2},
                {value: 30.0, order: 3},
                {value: 186.0, order: 4},
                {value: 63.0, order: 5},
            ],
            effectiveness_min_scores_attributes: [
                {value: 20.0, order: 1},
                {value: 15.0, order: 2},
                {value: 10.0, order: 3},
                {value: 50.0, order: 4},
                {value: 25.0, order: 5},
            ],
            effectiveness_max_scores_attributes: [
                {value: 115.0, order: 1},
                {value: 60.0, order: 2},
                {value: 50.0, order: 3},
                {value: 225.0, order: 4},
                {value: 90.0, order: 5},
            ],
            effectiveness_desired_scores_attributes: [
                {value: 80.0, order: 1},
                {value: 55.0, order: 2},
                {value: 35.0, order: 3},
                {value: 165.0, order: 4},
                {value: 50.0, order: 5},
            ],
            effectiveness_weight_scores_attributes: [
                {value: 10, order: 1},
                {value: 8, order: 2},
                {value: 6, order: 3},
                {value: 7, order: 4},
                {value: 4, order: 5},
            ],
            risk_financial_scores_attributes: [
                {linguistic: "middle", authenticity: 0.8, order: 1},
                {linguistic: "low", authenticity: 0.9, order: 2},
                {linguistic: "middle", authenticity: 0.1, order: 3},
                {linguistic: "above_middle", authenticity: 0.7, order: 4},
                {linguistic: "middle", authenticity: 0.6, order: 5},
            ],
            risk_investment_scores_attributes: [
                {linguistic: "low", authenticity: 0.2, order: 1},
                {linguistic: "low", authenticity: 0.8, order: 2},
                {linguistic: "above_middle", authenticity: 0.4, order: 3},
                {linguistic: "low", authenticity: 0.6, order: 4},
                {linguistic: "above_middle", authenticity: 0.7, order: 5},
            ],
            risk_operational_scores_attributes: [
                {linguistic: "below_middle", authenticity: 0.8, order: 1},
                {linguistic: "below_middle", authenticity: 0.7, order: 2},
                {linguistic: "below_middle", authenticity: 0.4, order: 3},
                {linguistic: "below_middle", authenticity: 0.3, order: 4},
                {linguistic: "below_middle", authenticity: 0.9, order: 5},
                {linguistic: "below_middle", authenticity: 0.4, order: 6},
                {linguistic: "middle", authenticity: 0.6, order: 7},
                {linguistic: "above_middle", authenticity: 0.8, order: 8},
                {linguistic: "middle", authenticity: 0.1, order: 9},
            ],
            risk_innovation_activity_scores_attributes: [
                {linguistic: "low", authenticity: 0.8, order: 1},
                {linguistic: "low", authenticity: 0.9, order: 2},
                {linguistic: "below_middle", authenticity: 0.1, order: 3},
                {linguistic: "below_middle", authenticity: 0.7, order: 4},
                {linguistic: "below_middle", authenticity: 0.6, order: 5},
            ],
            team_stability_scores_attributes: [
                {linguistic: "high", confidence: 0.8, weight: 8, order: 1},
                {linguistic: "below_middle", confidence: 0.9, weight: 9, order: 2},
            ],
            team_professional_competency_scores_attributes: [
                {linguistic: "high", confidence: 0.7, weight: 8, order: 1},
                {linguistic: "high", confidence: 0.8, weight: 10, order: 2},
                {linguistic: "middle", confidence: 0.6, weight: 9, order: 3},
                {linguistic: "middle", confidence: 0.5, weight: 10, order: 4},
                {linguistic: "middle", confidence: 0.7, weight: 7, order: 5},
            ],
            team_professional_activity_scores_attributes: [
                {linguistic: "below_middle", confidence: 0.8, weight: 8, order: 1},
                {linguistic: "high", confidence: 0.9, weight: 6, order: 2},
                {linguistic: "middle", confidence: 0.9, weight: 7, order: 3},
                {linguistic: "below_middle", confidence: 0.8, weight: 9, order: 4},
            ],
        }
    }

    const {register, handleSubmit} = useForm({
        defaultValues,
    });

    const onSubmit = async (data: any) => {
        const response = await createEvaluation({params: data, token: token});

        console.log(response);
        alert('Form submitted successfully!');
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-12"
        >
            <Effectiveness register={register}/>
            <Risk register={register}/>
            <Team register={register}/>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
            >
                {t('buttons.submit')}
            </button>
        </form>
    );
}
