import { z } from "zod"
import { Schedule } from "../entities"
import { schedulesRequestSchema } from "../schemas/schedules.schemas"

export type TSchedules = Schedule
export type TSchedulesRequest = z.infer<typeof schedulesRequestSchema> 