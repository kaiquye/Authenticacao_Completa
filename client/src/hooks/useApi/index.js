import axios from 'axios';
import decode from 'jwt-decode'
import { useEffect, useState } from 'react';


const Api = axios.create({
    baseURL: 'http://localhost:5000/user'
})

export const useApi = () => ({

    login: async (email, password) => {
        const response = await Api.post('/login', { email, password });
        return response.data;
    },
    ValidateToken: async (refreshToken, Token) => {
        var response = await Api.get('/authentication-token', { headers: { 'x-custom-header': Token } });
        return { ok: response.data.ok, data: response.data }
    },
    RefreshToken: async (refreshToken, Token) => {
        const { iat, exp } = decode(Token);
        // pegando os segundos
        const segundos = Math.abs((iat - exp) / 60);
        if (segundos > 1 && segundos < 10) {
            const response = await Api.put('/refresh-token', { RefreshTokenID: refreshToken }, { headers: { 'x-custom-header': Token } });
            console.log('refresh token ',response)
            if (response.data.ok) {
                localStorage.setItem('RefreshToken', response.data.token);
            }
        }
    }
})
