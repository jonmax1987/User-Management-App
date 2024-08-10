import { apiRequest } from './apiRequest';

export const loginUser = async (data) => {
    return apiRequest('POST', '/api/auth/login', data);
};

export const registerUser = async (data) => {
    return apiRequest('POST', '/api/auth/register', data);
};

export const logoutUser = async () => {
    return apiRequest('POST', '/api/auth/logout');
};

export const validateToken = async () => {
    return apiRequest('GET', '/api/auth/protected-route');
};
