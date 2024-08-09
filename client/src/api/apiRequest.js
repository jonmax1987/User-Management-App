import axios from 'axios';

export const apiRequest = async (method, url, data = {}, withCredentials = false) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            withCredentials: withCredentials
        });

        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
            return error.response;
        } else if (error.request) {
            console.error('No response received from server:', error.request);
        } else {
            console.error('Error during the request:', error.message);
        }
        throw error;
    }
};
