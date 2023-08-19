import "express-async-errors"
import "reflect-metadata"
import express, {json} from "express"
import handleError from "./middlewares/handle.middleware"
import mainRouter from "./router"


const app = express()
app.use(json())

app.use(mainRouter)

app.use(handleError)

export default app