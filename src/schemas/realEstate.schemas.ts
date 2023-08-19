import { z } from "zod"
import { addressRequestSchema, addressSchema } from "./address.schemas"
import { categorySchema } from "./categories.schemas"

export const realEstateSchema = z.object({
    id: z.number(),
    value: z.number().or(z.string()),
    size: z.number().positive().int(),
    sold: z.boolean().default(false),
    address: addressSchema,
    category: categorySchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export const realEstateRequestSchema = realEstateSchema.omit({
    id: true,
    address: true,
    category: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    address: addressRequestSchema,
    categoryId: z.number()
})

