import {FeasibilityLevel} from "@/lib/types/FeasibilityLevel";

export interface User {
    id: string;
    email: string;
    name: string;
    feasibility_threshold: number;
    adjustment_delta: number;
    feasibility_levels: FeasibilityLevel[];
    created_at: string;
    updated_at: string;
}