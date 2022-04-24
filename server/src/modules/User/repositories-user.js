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
        await Connection("accept_token").insert({ accept_token: refreshToken, userId: idUser });
    }
}

export default new Model();