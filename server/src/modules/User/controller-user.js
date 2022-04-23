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
            return res.status(201).json({ ok: true, message: Created.message });
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
            const Token = await Auth.CreateToken({ email, password });
            return res.status(200).json({ ok: true, token: Token });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ ok: false, message: "Error. Não foi possivel criar um novo usuario. Erro no servidor." });
        }
    }
}

export default new Controller();
