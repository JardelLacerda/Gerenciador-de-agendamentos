import { z } from "zod"

export const addressSchema = z.object({
    id: z.number(),
    street: z.string(),
    zipCode: z.string().max(8),
    number: z.string().optional(),
    city: z.string(),
    state: z.string().max(2)
})

export const addressRequestSchema = addressSchema.omit({id: true})