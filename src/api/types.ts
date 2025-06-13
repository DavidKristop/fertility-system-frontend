export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    email: string;
    confirmPassword: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserProfile {
    id: number;
    phone: string;
    role: string;
}

