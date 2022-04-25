import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:5000/user'
})

export const useApi = () => ({
    login: async (email, password) => {
        const response = await Api.post('/login', { email, password });
        return response.data;
    },
    refreshToken: async (refreshToken, Token){
        const response = await Api.post('/login', { email, password });
        return response.data;
    }
})
