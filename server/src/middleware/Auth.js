import jsonwebtoken from 'jsonwebtoken';

class Auth {

    async CreateToken(data) {
        console.log('user', data);
        const Token = await jsonwebtoken.sign({ data }, process.env.SECRET, { expiresIn: process.env.expiresIn });
        // boa pratica : Criar uma secret para valida somente o token do banco de dados.
        const RefreshToken = await jsonwebtoken.sign({ data }, process.env.SECRET, { expiresIn: '9999999999999' });
        return { Token, RefreshToken };
    }

    async ValidateToken(req, res, next) {
        const Token = req.headers['x-custom-header'];
        console.log(process.env.SECRET)
        if (!Token) {
            return res.status(401).json({ message: 'Token não foi informado.' });
        }
        try {
            const { data } = jsonwebtoken.verify(Token, process.env.SECRET);
            if (data) return next()
        } catch (error) {
            return res.status(401).json({ ok: false, message: 'Usuario não tem permisão. ' + error.message });
        }
    }

    async ValidateUser(req, res) {
        const Token = req.headers['x-custom-header'];
        console.log(process.env.SECRET)
        if (!Token) {
            return res.status(401).json({ message: 'Token não foi informado.' });
        }
        try {
            const { data } = jsonwebtoken.verify(Token, process.env.SECRET);
            if (req.body.RefreshToken) {
                this.ValidateRefreshToken(req.body.RefreshToken);
            }
            return res.status(200).json({ ok: true, data });
        } catch (error) {
            return res.status(401).json({ ok: false, message: 'Usuario não tem permisão. ' + error.message });
        }
    }

    async ValidateRefreshToken(RefreshToken) {
        try {
            // verifica se o refresh token que esta salvo no banco de dados ainda é valido (tempo).
            const { data } = jsonwebtoken.verify(RefreshToken, process.env.SECRET);
            // criar um novo token com as informações do token que veio banco de dados (email, id do usuario).
            const { Token } = await this.CreateToken(data)
            // retorna o novo token
            return Token
        } catch (error) {
            // retorna false, caso não possa criar novos tokens.
            return new Error('Refresh token invalid.')
        }
    }

}

export default new Auth();