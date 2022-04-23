import Repositories from "./repositories-user.js";
import yup from './yup.js';
import bcrypt from 'bcrypt';

class Services {
    async Create({ name, email, password }) {
        const valideteForm = await yup.Validate(name, password, email);
        if (valideteForm) return new Error(valideteForm);
        try {
            const AlreadyHasUser = await Repositories.findByEmail(email);
            if (AlreadyHasUser) return new Error('Já exite um usuario cadastrado com esse email');
            const salt = bcrypt.genSaltSync(10);
            const crypt = bcrypt.hashSync(password, salt);
            await Repositories.Create(name, email, crypt);
        } catch (error) {
            console.log(error)
            throw new Error('Não foi possivel criar usuario');
        }
    }

    async LoginUser({ email, password }) {
        try {
            const userPassword = await Repositories.getPasswordByEmail(email);
            if (!userPassword) return new Error('email não existe.');
            const match = await bcrypt.compare(password, userPassword);
            if (!match) return new Error('senha invalida');
            return true;
        } catch (error) {
            console.log(error)
            throw new Error('Não foi possivel fazer o login do  usuario');
        }
    }

}
export default new Services();