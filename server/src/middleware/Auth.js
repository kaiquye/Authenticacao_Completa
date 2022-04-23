import jsonwebtoken from 'jsonwebtoken';

class Auth {

    async CreateToken(data) {
        const Token = await jsonwebtoken.sign({ data }, process.env.SECRET, { expiresIn: process.env.EXPIRESIN });
        console.log(Token);
    }
}

export default new Auth();