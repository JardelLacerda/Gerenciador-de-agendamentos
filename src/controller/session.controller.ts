import { Request, Response } from "express"
import { TSessionRequest } from "../interfaces/session.interface"
import { createSessionService } from "../services/session.service"

export const createSessionController = async (req: Request, resp: Response ): Promise<Response>  => {
    const payload: TSessionRequest = req.body

    const token: string = await createSessionService(payload)

    return resp.status(200).json({token})
}