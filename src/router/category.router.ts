import { Router } from "express"
import { createCategoryController, listCategoriesController, listCategoriesRelationRealEstateController } from "../controller/categories.controller"
import validated from "../middlewares/validated.middleware"
import { categoryRequestSchema } from "../schemas/categories.schemas"
import verify from "../middlewares/verify.middleware"

const categoriesRouter = Router()

categoriesRouter.post("", 
    validated.token,
    validated.body(categoryRequestSchema),
    verify.isAdminOrOwner,
    verify.categoryName,
    createCategoryController
)

categoriesRouter.get("", 
    listCategoriesController
)

categoriesRouter.get("/:id/realEstate", 
    verify.isCategoryExist,
    listCategoriesRelationRealEstateController
)

export default categoriesRouter