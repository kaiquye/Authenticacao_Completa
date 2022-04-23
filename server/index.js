import "dotenv/config";
import Main from "./src/main.js";

const Server = new Main().App;

Server.listen(process.env.PORT || 8080, () => { console.log(`Servidor ligado em http://localhost${process.env.PORT || 8080}`); });
