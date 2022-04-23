import Connection from "../../database/index.js";

class Model {
    async Create(name, email, password) {
        return await Connection("usuario").insert({ name, email, password });
    }
    async findByEmail(email) {
        return await Connection("usuario").select('name').where('email', email).first();
    }
    async getPasswordByEmail(email) {
        return await Connection("usuario").select('password').where('email', email).first();
    }
}

export default new Model();