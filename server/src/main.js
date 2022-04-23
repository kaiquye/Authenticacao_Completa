import express from "express";
import UserRoutes from "./modules/User/routes-user.js";

class Main {
    App;

    constructor() {
        this.App = express();
        this.App.use(express.json());
        this.Routes();
    }

    Routes() {
        this.App.use("/user", UserRoutes);
    }
}

export default Main;
