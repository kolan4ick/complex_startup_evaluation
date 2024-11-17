// src/types/user.ts
export interface User {
    id: string;
    email: string;
    name: string;
    feasibility_threshold: number;
    adjustment_delta: number;
    created_at: string;
    updated_at: string;
}

export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
