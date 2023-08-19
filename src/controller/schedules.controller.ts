import { Request, Response } from "express"
import { TSchedulesRequest } from "../interfaces/schedules.interface"
import { createSchedulesService, listSchedulesService } from "../services/schedules.service"
import { TRealEstate } from "../interfaces/realEstate.interface"

export const createSchedulesController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TSchedulesRequest = req.body
    const { id, foundRealEstate } = resp.locals

    const newSchedule: string = await createSchedulesService(payload, Number(id), foundRealEstate)

    return resp.status(201).json({message: newSchedule})
}

export const listSchedulesController = async (req: Request, resp: Response): Promise<Response> => {
    const { id } = req.params

    const listSchedules: TRealEstate = await listSchedulesService(Number(id))

    return resp.status(200).json(listSchedules)
}