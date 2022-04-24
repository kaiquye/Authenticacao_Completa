import jsonwebtoken from 'jsonwebtoken';

class Auth {

    async CreateToken(data) {
        console.log('user', data);
        const Token = await jsonwebtoken.sign({ data }, process.env.SECRET, { expiresIn: process.env.expiresIn });
        // boa pratica : Criar uma secret para valida somente o token do banco de dados.
        const RefreshToken = await jsonwebtoken.sign({ data }, process.env.SECRET, { expiresIn: '600' });
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
            console.log('data', data)
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
            return res.status(200).json({ ok: true, data });
        } catch (error) {
            return res.status(401).json({ ok: false, message: 'Usuario não tem permisão. ' + error.message });
        }
    }

    async ValidateRefreshToken(RefreshToken) {
        try {
            const { data } = jsonwebtoken.verify(RefreshToken, process.env.SECRET);
            console.log('refresh', data)
            this.CreateToken(data)
            return res.status(200).json({ ok: true, data });
        } catch (error) {
            return res.status(401).json({ ok: false, message: 'Usuario não tem permisão. ' + error.message });
        }
    }

}

export default new Auth();