import { Router } from "express";
import Controller from './controller-user.js'
import Auth from '../../middleware/Auth.js'
class Routes {
    App;

    constructor() {
        this.App = Router();
        this.RoutesPublic();
        this.Middleware();
        this.RoutePrivete();
    }
    Middleware() {
        this.App.use(Auth.ValidateToken);
    }
    RoutePrivete() {
        // novo usuario
        this.App.post("/", Controller.Criar);

        // GERAR NOVO TOKEN : 
        // Casos de usos: Essa rota pode ser usada em seu Context-Api com um useEffect. Todas as vezes que alguma pagina for renderizada e ela estiver dentro do seu context de authenticação será criado um novo Token 🌎
        this.App.put('/refresh-token', Controller.RefreshToken);
    }
    RoutesPublic() {
        // login usuario
        this.App.post("/login", Controller.LoginUser);
    }
}


export default new Routes().App;
