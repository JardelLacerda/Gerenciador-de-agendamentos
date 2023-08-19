import { userRepo } from "../data-source";
import { TUser } from "../interfaces/users.interface";
import { TSessionRequest } from "../interfaces/session.interface"
import AppError from "../error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const createSessionService = async (payload: TSessionRequest): Promise<string> => {

    const { email, password } = payload

    const user: TUser | null = await userRepo.findOneBy({ email: email })

    if (!user) throw new AppError('Invalid credentials', 401)
  
    const samePassword: boolean = await compare(password, user.password)

    if (!samePassword) throw new AppError('Invalid credentials', 401)
  
    const id: string = user.id.toString()
    const admin: boolean = user.admin

    const { SECRET_KEY: secretKey, EXPIRES_IN: expiresIn } = process.env
  
    const token: string = sign({ admin }, secretKey!, { subject: id, expiresIn })
  
    return token
}