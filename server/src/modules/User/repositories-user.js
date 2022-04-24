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
        // salvo o refreshToken com o id do usuario, quando vou gerar um novo token para o mesmo, verifico
        // antes se o tempo Token que estar no banco de dados ainda é valido.
        const accept_token = await Connection("accept_token").select('id').where('userId', idUser);
        if (!accept_token[0]) {
            await Connection("accept_token").insert({ accept_token: refreshToken, userId: idUser });
        } else {
            await Connection("accept_token").update({ accept_token: refreshToken }).where('userId', idUser);
        }
    }
    async findRefreshTokenById(RefreshTokenID) {
        // posso salvar o ID do usuario quanto o id do refreshToken, neste caso estou buscando pelo id do RefreshToken.
        return await Connection("accept_token").select('accept_token').where('id', RefreshTokenID).first();
    }
}

export default new Model();