import { z } from "zod"
import { sessionRequestSchema } from "../schemas/session.schemas";

export type TSessionRequest = z.infer<typeof sessionRequestSchema>