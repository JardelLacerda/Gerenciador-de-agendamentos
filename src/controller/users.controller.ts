import {Request, Response} from "express"
import { TUser, TUserRequest, TUserRequestUpdate, TUserResponse } from "../interfaces/users.interface"
import { createUserService, destroyUserService, listUsersService, updateUserService } from "../services/users.service"

export const createController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TUserRequest = req.body

    const newUser: TUserResponse = await createUserService(payload)

    return resp.status(201).json(newUser)
}

export const listUsersController = async (req: Request, resp: Response): Promise<Response> => {
    
    const users: TUserResponse[] = await listUsersService()

    return resp.status(200).json(users)
}

export const updateUserController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TUserRequestUpdate = req.body

    const { foundUser }  = resp.locals

    const updateUser: TUserResponse = await updateUserService(payload, foundUser)

    return resp.status(200).json(updateUser)
}

export const destroyUserController = async (req: Request, resp: Response): Promise<Response> => {

    const { foundUser }  = resp.locals

    await destroyUserService(foundUser)

    return resp.status(204).json()
}