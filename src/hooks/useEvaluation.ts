import apiClient from "@/lib/services/apiClient";

interface EvaluationParams {
    team_competencies: number;
    team_competencies_and_experience: number;
    team_leaders_competencies: number;
    team_professional_activity: number;
    team_stability: number;
    feasibility_linguistic: number;
    effectiveness_sum_scores_attributes: Array<{ value: number }>;
    effectiveness_min_scores_attributes: Array<{ value: number }>;
    effectiveness_max_scores_attributes: Array<{ value: number }>;
    effectiveness_desired_scores_attributes: Array<{ value: number }>;
    effectiveness_weight_scores_attributes: Array<{ value: number }>;
    risk_financial_scores_attributes: Array<{ linguistic: string; authenticity: number }>;
    risk_investment_scores_attributes: Array<{ linguistic: string; authenticity: number }>;
    risk_operational_scores_attributes: Array<{ linguistic: string; authenticity: number }>;
    risk_innovation_activity_scores_attributes: Array<{ linguistic: string; authenticity: number }>;
    team_stability_scores_attributes: Array<{ linguistic: string; confidence: number; weight: number }>;
    team_professional_competency_scores_attributes: Array<{ linguistic: string; confidence: number; weight: number }>;
    team_professional_activity_scores_attributes: Array<{ linguistic: string; confidence: number; weight: number }>;
}

interface EvaluationResponse {
    effectiveness: any;
    risk: any;
    team: any;
    financing_feasibility: any;
}

interface Evaluation {
    id: string;
    team_competencies: number;
    team_competencies_and_experience: number;
    team_leaders_competencies: number;
    team_professional_activity: number;
    team_stability: number;
    feasibility_linguistic: number;
}

export const getEvaluations = async ({token}: { token: string | null }): Promise<Evaluation[]> => {
    const response = await apiClient.get('/evaluations', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getEvaluation = async ({id, token}: { id: string, token: string | null }): Promise<Evaluation> => {
    const response = await apiClient.get(`/evaluations/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createEvaluation = async (
    {params, token}: { params: EvaluationParams; token: string | null }
): Promise<EvaluationResponse> => {
    const response = await apiClient.post(
        '/evaluations',
        {evaluation: params},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};