import { apiRequest } from './apiRequest';

export const createUser = async (data) => {
    return apiRequest('POST', '/api/users/create', data);
};

export const fetchUsers = async () => {
    return apiRequest('GET', `/api/users/`);
};

export const updateUser = async (id, data) => {
    return apiRequest('PUT', `/api/users/${id}`, data);
};

export const deleteUser = async (id) => {
    return apiRequest('DELETE', `/api/users/${id}`);
};
