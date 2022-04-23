import { Router } from "express";
import Controller from './controller-user.js'
class Routes {
    App;

    constructor() {
        this.App = Router();
        this.Route();
    }

    Route() {
        this.App.post("/", Controller.Criar);
    }
}

export default new Routes().App;
