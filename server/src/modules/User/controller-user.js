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
            return res.status(200).json({ ok: true, token: Token });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, message: "Não foi possivel fazer login." });
        }
    }


    async RefreshToken(req, res) {
        try {
            const { RefreshTokenId } = req.body;
            if (!RefreshTokenId) {
                return res.status(400).json({ ok: false, message: "Refresh Token invalid" });
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, message: "Não foi possivel geraar um novo token." });
        }
    }
}

export default new Controller();
