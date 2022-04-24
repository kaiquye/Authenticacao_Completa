import Connection from "../../database/index.js";

class Model {
    async Create(name, email, password) {
        return await Connection("usuario").insert({ name, email, password });
    }
    async findByEmail(email) {
        return await Connection("usuario").select('name').where('email', email).first();
    }
    async getPasswordByEmail(email) {
        return await Connection("usuario").select('password', 'id').where('email', email).first();
    }
    async createNewRefreshToken(refreshToken, idUser) {
        // salvo o refreshToken com o id do usuario
        // antes se o tempo Token que estar no banco de dados ainda é valido.
        const accept_token = await Connection("accept_token").select('id').where('userId', idUser);
        if (!accept_token[0]) {
            console.log('inset00000000000000000000')
            await Connection("accept_token").insert({ accept_token: refreshToken, userId: idUser });
        } else {
            console.log('updte111111111111111')
            await Connection("accept_token").update({ accept_token: refreshToken }).where('userId', idUser);
        }
    }
    async findRefreshTokenByUserId(RefreshTokenID) {
        // a chave do meu RefreshTokenID e o id do usuario
        return await Connection("accept_token").select('accept_token').where('userId', RefreshTokenID).first();
    }
}

export default new Model();