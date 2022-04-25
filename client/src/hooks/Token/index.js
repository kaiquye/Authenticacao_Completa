export const useToken = () => ({
    getToken: () => {
        const Token = localStorage.getItem('token');
        if (Token) return Token
        return false;
    },
    setToken: (Token) => {
        localStorage.setItem('token', Token);
    },
    setRefreshToken: (RefreshToke) => {
        localStorage.setItem('RefreshToke', RefreshToke);
    }
})