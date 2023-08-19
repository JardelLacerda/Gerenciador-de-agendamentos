import { Router } from "express"
import validated from "../middlewares/validated.middleware"
import verify from "../middlewares/verify.middleware"
import { createRealEstateController, readRealEstateController } from "../controller/realEstate.controller"
import { realEstateRequestSchema } from "../schemas/realEstate.schemas"

const realEstateRouter = Router()

realEstateRouter.post("", 
    validated.token,
    verify.isAdminOrOwner,
    validated.body(realEstateRequestSchema),
    verify.isCategoryExist,
    createRealEstateController
)

realEstateRouter.get("", readRealEstateController)

export default realEstateRouter