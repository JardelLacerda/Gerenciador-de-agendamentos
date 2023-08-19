import { Router } from "express"
import { createController, destroyUserController, listUsersController, updateUserController } from "../controller/users.controller"
import { userRequestSchema, userRequestUpdateSchema } from "../schemas/users.schemas"
import validated from "../middlewares/validated.middleware"
import verify from "../middlewares/verify.middleware"

const usersRouter = Router()

usersRouter.post("", 
    validated.body(userRequestSchema), 
    verify.email, 
    createController
)

usersRouter.get("", 
    validated.token, 
    verify.isAdminOrOwner,
    listUsersController
)

usersRouter.patch("/:id", 
    validated.token,
    verify.isUserExist,
    verify.isAdminOrOwner,
    validated.body(userRequestUpdateSchema),
    updateUserController
)

usersRouter.delete("/:id", 
    validated.token,
    verify.isUserExist,
    verify.isAdminOrOwner,
    destroyUserController
)

export default usersRouter