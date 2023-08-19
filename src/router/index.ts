import { Router } from "express"
import usersRouter from "./users.router";
import sessionRouter from "./session.router";
import categoriesRouter from "./category.router";
import realEstateRouter from "./realEstate.router";
import schedulesRouter from "./schedules.router";

const mainRouter = Router()

mainRouter.use("/users", usersRouter)
mainRouter.use("/login", sessionRouter)
mainRouter.use("/categories", categoriesRouter)
mainRouter.use("/realEstate", realEstateRouter)
mainRouter.use("/schedules", schedulesRouter)

export default mainRouter

