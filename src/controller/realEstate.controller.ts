import { Request, Response } from "express"
import { createRealEstateService, readRealEstateService } from "../services/realEstate.service"
import { TRealEstateRequest } from "../interfaces/realEstate.interface"

export const createRealEstateController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TRealEstateRequest = req.body
    const { foundCategory } = resp.locals

    const newRealEstate = await createRealEstateService(payload, foundCategory)

    return resp.status(201).json(newRealEstate)
}

export const readRealEstateController = async (req: Request, resp: Response): Promise<Response> => {

    const listRealEstate = await readRealEstateService()

    return resp.status(200).json(listRealEstate)
}