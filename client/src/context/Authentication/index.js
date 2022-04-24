/*
     Esse contexto é responsalve pela authenticação do usuario. 
    -> Todas as informaçôes de de login ficam salvas aqui.
*/
import { createContext, useState } from 'react'
import { useApi } from '../../hooks/useApi';
export const AuthContext = createContext({});

export const AuthContextProvider = function ({ children }) {

    const [userIsAuthenticated, setUserIsAuthenticated] = useState({ email: undefined })
    
    const api = useApi();

    const Login = function (email, password) {
        alert('tedted')
    }

    return (
        <AuthContext.Provider value={{ Login }} >
            {children}
        </AuthContext.Provider>
    )
}
