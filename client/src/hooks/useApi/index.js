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
        // pegando os milissegundos de inicio e termino do token
        const { iat, exp } = decode(Token);
        // subitraindo os milissegundos e dividindo por 60 para poder pegar a quantidade em  minutos.
        const segundos = Math.abs((iat - exp) / 60);
        // subitraindo a diferença entre os minutos do token com a data atual. Ex : 30min(Token) - 15min(Data atual) = 15 minutos antes de expirar o token
        const exr = (segundos - new Date().getMinutes())
        if (exr > 1 && segundos < 10) {
            const response = await Api.put('/refresh-token', { RefreshTokenID: refreshToken }, { headers: { 'x-custom-header': Token } });
            if (response.data.ok) {
                localStorage.setItem('RefreshToken', response.data.token);
            }
        }
    }
})
