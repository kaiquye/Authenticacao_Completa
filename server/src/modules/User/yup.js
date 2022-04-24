import Yup from 'yup';

class FormCheck {
    async Validate(name, password, email) {
        const Check = Yup.object().shape({
            name: Yup.string('Nome com formato invalido.').required('Nome obrigatorio.'),
            password: Yup.string('Senha com formato invalido').required('senha obrigatorio').min(4, 'senha muito curta.'),
        })
        try {
            await Check.validate({ nome, password, email });
        } catch (error) {
            return error.errors;
        }
    }
}
export default new FormCheck();