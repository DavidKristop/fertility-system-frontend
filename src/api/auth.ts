import { fetchWrapper } from '.';
import type { AuthResponse, LoginRequest, RegisterRequest } from './types';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post(`${BACKEND_URL}/auth/signin`, data);
    return response.data as AuthResponse;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const { confirmPassword, ...payload } = data;
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, payload);
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Registration failed:', error.response.data);
        throw new Error(error.response.data.message || 'Registration failed');
      }
      console.error('Registration failed with unknown error:', error);
      throw new Error('An unexpected error occurred during registration.');
    }
};

export const loginWithGoogle = async (credential: string): Promise<AuthResponse> => {
    const response = await fetchWrapper('auth/google/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
        throw new Error('Google login failed');
    }

    return response.json();
};