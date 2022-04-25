export const useToken = () => ({
    getToken: () => {
        const Token = localStorage.getItem('Token');
        if (Token) return Token
        return false;
    },
    getRefreshToken: () => {
        const Token = localStorage.getItem('RefreshToken');
        if (Token) return Token
        return false;
    },
    setToken: (Token) => {
        localStorage.setItem('Token', Token);
    },
    setRefreshToken: (RefreshToke) => {
        localStorage.setItem('RefreshToken', RefreshToke);
    },
})