import { apiRequest } from './apiRequest';

export const loginUser = async (data) => {
    return apiRequest('POST', '/api/users/login', data);
};

export const registerUser = async (data) => {
    return apiRequest('POST', '/api/users/register', data);
};

export const logoutUser = async () => {
    return apiRequest('POST', '/api/users/logout');
};

export const validateToken = async () => {
    return apiRequest('GET', '/api/users/protected-route');
};
