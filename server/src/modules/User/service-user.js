import Repositories from "./repositories-user.js";
import yup from './yup.js';
import bcrypt from 'bcrypt';
import Auth from '../../middleware/Auth.js'

class Services {
    async Create({ name, email, password }) {
        console.log(name, email, password)
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
            const idUser = userPassword.id;
            if (!userPassword) return new Error('email não existe.');
            console.log(userPassword)
            const match = await bcrypt.compare(password, userPassword.password);
            if (!match) return new Error('senha invalida');
            // crio o token e refrehstoken
            const { Token, RefreshToken } = await Auth.CreateToken({ email, idUser });
            // salvo o refreshToken do usuario no DB junto com seu ID.
            await Repositories.createNewRefreshToken(RefreshToken, idUser);
            // retorno o token de acesso
            return Token
        } catch (error) {
            console.log(error)
            throw new Error('Não foi possivel fazer o login do  usuario');
        }
    }

    async RefreshToken(id) {
        try {
            // essa rota e protegida por um middleware, neste middleware exite a validação do token do usuario.
            // caso passe neste middleware
            // --> busca um token no banco de dados;
            // esse token é criado quando o usuario faz login. Ele tem um tempo limite maior, exemplo : 1hr.
            // o usuario, dono deste token, pode fazer o refresh token durante 1hr, depois desse periodo 
            // o token continua armazenado no banco de dados, caso o usuario faça login novamente, este token e atualizado. 
            const AlreadyRefreshToken = await findRefreshTokenById('id', id);
            // verificar se esse token exite;
            if (!AlreadyRefreshToken) return new Error('Token refresh invalido.');
            // Valida o refreshToken que esta salvo no banco de dados. (time);
            const isValid = await Auth.ValidateRefreshToken(AlreadyRefreshToken);
            console.log(isValid)
        } catch (error) {

        }
    }

}
export default new Services();