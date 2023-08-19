import { userRepo } from "../data-source";
import AppError from "../error";
import { TUser, TUserRequest, TUserRequestUpdate, TUserResponse } from "../interfaces/users.interface";
import { userAllResponseSchema, userResponseSchema } from "../schemas/users.schemas";


export const createUserService = async (payload: TUserRequest): Promise<TUserResponse> => {

    const newUser: TUser = userRepo.create(payload)

    await userRepo.save(newUser)

    const userValid: TUserResponse = userResponseSchema.parse(newUser)

    return userValid
}

export const listUsersService = async (): Promise<TUserResponse[]> => {

    const users: TUser[] | null = await userRepo.find()
    
    const usersValid: TUserResponse[] = userAllResponseSchema.parse(users)

    return usersValid
}

export const updateUserService = async (payload: TUserRequestUpdate, foundUser: TUser): Promise<TUserResponse> => {

    const updateUser = userRepo.create({
        ...foundUser,
        ...payload
    })

    await userRepo.save(updateUser)

    const userValid: TUserResponse = userResponseSchema.parse(updateUser)

    return userValid
}

export const destroyUserService =  async (foundUser: TUser): Promise<void> => {

    await userRepo.softRemove(foundUser)

    return 
}