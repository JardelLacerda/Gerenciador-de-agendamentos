import { z } from "zod"
import { RealEstate } from "../entities";
import { realEstateRequestSchema } from "../schemas/realEstate.schemas";

export type TRealEstate = RealEstate
export type TRealEstateRequest = z.infer<typeof realEstateRequestSchema>