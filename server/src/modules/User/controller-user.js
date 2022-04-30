import Services from "./service-user.js";
import Auth from '../../middleware/Auth.js'
import http from 'http'

class Controller {
    async Criar(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ ok: false, message: '  campos nullos', STATUS_CODES: http.STATUS_CODES['400'] });
            }
            const Created = await Services.Create(req.body);
            if (Created instanceof Error) return res.status(400).json({ ok: false, STATUS_CODES: http.STATUS_CODES['400'], message: Created.message });
            return res.status(201).json({ ok: true, STATUS_CODES: http.STATUS_CODES['201'] });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, STATUS_CODES: http.STATUS_CODES['500'] });
        }
    }

    async AuthUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ ok: false, STATUS_CODES: http.STATUS_CODES['400'], message: "Campos nullos" });
            }
            const Login = await Services.LoginUser(req.body);
            if (Login instanceof Error) return res.status(404).json({ ok: false, STATUS_CODES: http.STATUS_CODES['404'], message: Login.message });
            return res.status(202).json({ ok: true, STATUS_CODES: http.STATUS_CODES['202'], token: Login });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, STATUS_CODES: http.STATUS_CODES['500'] });
        }
    }

    async LoginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ ok: false, STATUS_CODES: http.STATUS_CODES['400'], message: "Campos nullos" });
            }
            const Login = await Services.LoginUser(req.body);
            if (Login instanceof Error) return res.status(404).json({ ok: false, STATUS_CODES: http.STATUS_CODES['404'], message: Login.message });
            return res.status(202).json({ ok: true, STATUS_CODES: http.STATUS_CODES['202'], token: Login });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, STATUS_CODES: http.STATUS_CODES['500'] });
        }
    }

    /* -> Login: Um token é enviado para o client e o outro é salvo no banco de dados como :(refresh token). O
    refresh token é usado como base para criar outros novos tokens verificando o tempo de expiração dele.
     Quando o login é feito dois tokens é criado, um com duração de 1 hora e o outro com uma duração maior que é 
     salvo no db.  */
    /* a rota refrest-token é usada para criar um novo token. Essa rota e protegida pelo middleware de authenticação. SO È POSSIVEL CRIAR UM NOVO SE O TOKEN ANTIGO FOR VALIDO. */
    async RefreshToken(req, res) {
        try {
            const { RefreshTokenID } = req.body; // vamos buscar no banco de dados pelo token com esse id do usuario;
            if (!RefreshTokenID) {
                return res.status(400).json({ ok: false, STATUS_CODES: http.STATUS_CODES['400'], message: "Refresh Token invalid" });
            }
            const newToken = await Services.RefreshToken(RefreshTokenID);
            // se o token do db ja tive expirado ele retorna um error (sessão expirou)
            if (newToken instanceof Error) return res.status(401).json({ ok: false, STATUS_CODES: http.STATUS_CODES['401'], message: newToken.message });
            // se não, retorna um novo token para o client.
            return res.status(200).json({ ok: true, STATUS_CODES: http.STATUS_CODES['200'], token: newToken.Token, data: newToken.data });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, STATUS_CODES: http.STATUS_CODES['500'] });
        }
    }
}

export default new Controller();
