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
        // calcular a diferença entre milisegundos.
        // iat : data em milisegundos deste de 1970. 
        // exp : data em milisegundos deste de 1970 ate a data 
        // de validade do token
        // exp - milisegundos atuais / 60 = 30min
        const senc = Math.ceil(exp - (Date.now() / 1000)) / 60
        if (senc.toFixed(0) < 10) {
            const response = await Api.put('/refresh-token', { RefreshTokenID: refreshToken }, { headers: { 'x-custom-header': Token } });
            if (response.data.ok) {
                localStorage.setItem('RefreshToken', response.data.token);
            }
        }
    }
})
