import app from "./app";
import {AppDataSource} from "./data-source";

(async () => {
    const SERVER_PORT = process.env.SERVER_PORT || 3000
    await AppDataSource.initialize()
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    
    app.listen(SERVER_PORT, () => {
        console.log("Servidor executando")
    })    
})()