import Services from "./service-user.js";
import Auth from '../../middleware/Auth.js'

class Controller {
    async Criar(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ ok: false, message: "Campos nullos" });
            }
            const Created = await Services.Create(req.body);
            if (Created instanceof Error) return res.status(400).json({ ok: false, message: Created.message });
            return res.status(201).json({ ok: true, message: 'usuario criado com sucesso.' });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, message: "Error. Não foi possivel criar um novo usuario. Erro no servidor." });
        }
    }

    async LoginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ ok: false, message: "Campos nullos" });
            }
            const Login = await Services.LoginUser(req.body);
            if (Login instanceof Error) return res.status(400).json({ ok: false, message: Login.message });
            return res.status(200).json({ ok: true, token: Login });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, message: "Não foi possivel fazer login." });
        }
    }

    // RESUMO -> Login: Um token é enviado para o client e o outro é salvo no banco de dados como :(refresh token). O refresh token é usado como base para criar outros novos tokens verificando o tempo de expiração dele.
    // Quando o login é feito, dois tokens é criado, um com duração de 1 hora e o outro com uma duração maior que é salvo no db. 
    // a rota refrest-token é usada para criar um novo token. Essa rota e protegida pelo middleware de authenticação, com isso, SO È POSSIVEL CRIAR UM NOVO TOKEN SE O TOKEN ANTIGO FOR VALIDO.
    async RefreshToken(req, res) {
        try {
            const { RefreshTokenID } = req.body; // vamos buscar no banco de dados pelo token com esse id;
            // verificar se o ID do token foi enviado
            if (!RefreshTokenID) {
                return res.status(400).json({ ok: false, message: "Refresh Token invalid" });
            }
            // valido o token - recebo um novo token
            const newToken = await Services.RefreshToken(RefreshTokenID);
            // se o token do db ja tive expirado ele retorna um error (sessão expirou)
            if (newToken instanceof Error) return res.status(400).json({ ok: false, message: newToken.message });
            // se não, retorna um novo token para o client.
            return res.status(400).json({ ok: false, token: newToken });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, message: "Não foi possivel geraar um novo token." });
        }
    }
}

export default new Controller();
