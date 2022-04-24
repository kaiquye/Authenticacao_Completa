import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.URL_API
})

export const useApi = () => ({
    login: async (email, password) => {
        const response = await Api.post('/login', { email, password });
        console.log(response);
    }
})
