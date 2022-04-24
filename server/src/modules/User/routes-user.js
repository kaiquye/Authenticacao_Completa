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
        this.App.put('/refresh-token', Controller.RefreshToken);
        this.App.post("/", Controller.Criar);
    }
    RoutesPublic() {
        this.App.post("/login", Controller.LoginUser);
    }
}


export default new Routes().App;
