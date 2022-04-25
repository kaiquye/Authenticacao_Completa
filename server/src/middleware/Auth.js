import jsonwebtoken from 'jsonwebtoken';
import http from 'http'

class Auth {

    CreateToken(data) {
        console.log('user', data);
        console.log()
        const Token = jsonwebtoken.sign({ data }, process.env.SECRET, { expiresIn: '30s' });
        console.log(Token)
        // boa pratica : Criar uma secret para valida somente o token do banco de dados.
        const RefreshToken = jsonwebtoken.sign({ data }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '900000s' });
        return { Token, RefreshToken };
    }

    ValidateToken(req, res, next) {
        console.log(req)
        const Token = req.headers['x-custom-header'];
        if (!Token) {
            return res.status(400).json({ ok: false, STATUS_CODES: http.STATUS_CODES['400'], message: 'Token não foi informado.' });
        }
        try {
            console.log(req.headers['x-custom-header'])
            const { data } = jsonwebtoken.verify(req.headers['x-custom-header'], process.env.SECRET);
            if (data) return next()
        } catch (error) {
            return res.status(203).json({ ok: false, STATUS_CODES: http.STATUS_CODES['203'], message: 'Usuario não tem permisão. ' + error.message });
        }
    }

    async ValidateUser(req, res) {
        const Token = req.headers['x-custom-header'];
        console.log(process.env.SECRET)
        if (!Token) {
            return res.status(400).json({ ok: false, STATUS_CODES: http.STATUS_CODES['400'], message: 'Token não foi informado.' });
        }
        try {
            const { data } = jsonwebtoken.verify(Token, process.env.SECRET);
            if (req.body.RefreshToken) {
                this.ValidateRefreshToken(req.body.RefreshToken);
            }
            return res.status(200).json({ ok: true, STATUS_CODES: http.STATUS_CODES['200'], data });
        } catch (error) {
            return res.status(203).json({ ok: false, STATUS_CODES: http.STATUS_CODES['203'], message: 'Usuario não tem permisão. ' + error.message });
        }
    }

    async ValidateRefreshToken(RefreshToken) {
        try {
            // verifica se o refresh token que esta salvo no banco de dados ainda é valido (tempo).
            const { data } = jsonwebtoken.verify(RefreshToken, process.env.SECRET_REFRESH_TOKEN);
            // criar um novo token com as informações do token que veio banco de dados (email, id do usuario).
            const { Token } = await this.CreateToken(data)
            // retorna o novo token
            return { Token, data }
        } catch (error) {
            // retorna false, caso não possa criar novos tokens.
            return new Error('Sua sessão expirou. faça login novamente para continuar.' + error.message)
        }
    }

}

export default new Auth();