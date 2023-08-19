import { Router } from "express"
import { createSessionController } from "../controller/session.controller"
import validated from "../middlewares/validated.middleware"
import { sessionRequestSchema } from "../schemas/session.schemas"

const sessionRouter = Router()

sessionRouter.post("", 
    validated.body(sessionRequestSchema),
    createSessionController
)


export default sessionRouter