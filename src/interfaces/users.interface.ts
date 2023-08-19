import { z } from "zod";
import { userRequestSchema, userRequestUpdateSchema, userResponseSchema } from "../schemas/users.schemas";
import { User } from "../entities";
import { DeepPartial } from "typeorm";

export type TUser = User
export type TUserRequest = z.infer<typeof userRequestSchema>
export type TUserResponse = z.infer<typeof userResponseSchema>
export type TUserRequestUpdate = DeepPartial<User>