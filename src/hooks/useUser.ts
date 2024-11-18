import apiClient from "@/lib/services/apiClient";
import {User} from "@/lib/types/user";

interface LoginResponse {
    user: User | null;
    token: string | null;
}

interface LoginParams {
    email?: string;
    password?: string;
    token?: string;
}

interface RegisterParams {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export const loginUser = async ({email, password, token}: LoginParams): Promise<LoginResponse> => {
    let response;

    try {
        // Handle login with token
        if (token) {
            response = await apiClient.post('/users/sign_in', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        // Handle login with email and password
        else if (email && password) {
            response = await apiClient.post('/users/sign_in', {
                user: {
                    email,
                    password,
                },
            });
        } else {
            throw new Error('Either email and password or token must be provided');
        }

        // Extract the token from the headers
        const authorizationHeader = response.headers['authorization'] || response.headers['Authorization'];
        const extractedToken = authorizationHeader?.split('Bearer ')[1] || null;

        // Extract the user data
        const user = response.data?.status?.data?.user || null;

        return {
            user,
            token: extractedToken,
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};


export const registerUser = async ({
                                       name,
                                       email,
                                       password,
                                       passwordConfirmation
                                   }: RegisterParams): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/users', {
        user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }
    });

    return response.data;
}