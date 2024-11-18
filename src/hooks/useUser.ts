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
        if (token) {
            response = await apiClient.post('/users/sign_in', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
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

        const authorizationHeader = response.headers['authorization'] || response.headers['Authorization'];
        const extractedToken = authorizationHeader?.split('Bearer ')[1] || null;

        const user = response.data.user;

        return {
            user,
            token: extractedToken,
        };
    } catch (error) {
        throw error;
    }
};


export const registerUser = async ({
                                       name,
                                       email,
                                       password,
                                       passwordConfirmation
                                   }: RegisterParams): Promise<LoginResponse> => {
    const response = await apiClient.post('/users', {
        user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }
    });

    const authorizationHeader = response.headers['authorization'] || response.headers['Authorization'];
    const extractedToken = authorizationHeader?.split('Bearer ')[1] || null;

    const user = response.data.user;

    return {
        user,
        token: extractedToken,
    };
}