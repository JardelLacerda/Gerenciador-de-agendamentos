import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

export const userRequestSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
})

export const userResponseSchema = userSchema.omit({
    password: true
})

export const userAllResponseSchema = z.array(userResponseSchema)

export const userRequestUpdateSchema = userRequestSchema
.omit({admin: true})
.partial()