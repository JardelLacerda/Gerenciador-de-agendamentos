import { z } from "zod"
import { realEstateSchema } from "./realEstate.schemas"
import { userSchema } from "./users.schemas"

export const schedulesSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstate: realEstateSchema,
    user: userSchema
})

export const schedulesRequestSchema = schedulesSchema
.omit({
    id: true,
    realEstate: true,
    user: true
}).extend({
    realEstateId: z.number()
})