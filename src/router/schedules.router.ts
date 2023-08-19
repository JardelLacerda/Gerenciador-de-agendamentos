import { Router } from "express"
import validated from "../middlewares/validated.middleware"
import verify from "../middlewares/verify.middleware"
import { createSchedulesController, listSchedulesController } from "../controller/schedules.controller"
import { schedulesRequestSchema } from "../schemas/schedules.schemas"

const schedulesRouter = Router()

schedulesRouter.post("",
    validated.token,
    validated.body(schedulesRequestSchema),
    verify.isRealEstateExist,
    verify.isValidOptionsScheduler,
    createSchedulesController
)

schedulesRouter.get("/realEstate/:id",
    validated.token,
    verify.isAdmin,
    verify.isRealEstateExist,
    listSchedulesController
)

export default schedulesRouter
