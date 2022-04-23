import { Router } from "express";
import Controller from './controller-user.js'
class Routes {
    App;

    constructor() {
        this.App = Router();
        this.RoutesPublic();
        this.Route();
    }

    RoutePrivete() {
        this.App.post("/", Controller.Criar);
    }
    RoutesPublic() {
        this.App.post("/login", Controller.LoginUser);
    }
}


export default new Routes().App;
