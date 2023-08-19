import { z } from "zod"
import { categoryRequestSchema } from "../schemas/categories.schemas";
import { Category } from "../entities";

export type TCategory = Category
export type TCategoryRequest = z.infer<typeof categoryRequestSchema>