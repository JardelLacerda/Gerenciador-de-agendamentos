import { Request, Response } from "express"
import { TCategory, TCategoryRequest } from "../interfaces/categories.interface"
import { createCategoryService, listCategoriesRelationRealEstateService, listCategoryiesService } from "../services/categories.service"

export const createCategoryController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TCategoryRequest = req.body

    const newCategory: TCategory = await createCategoryService(payload)

    return resp.status(201).json(newCategory)
}

export const listCategoriesController = async (req: Request, resp: Response): Promise<Response> => {

    const categories: TCategory[] = await listCategoryiesService()

    return resp.status(200).json(categories)
}

export const listCategoriesRelationRealEstateController = async (req: Request, resp: Response): Promise<Response> => {
    const { id } = resp.locals.foundCategory 

    const categories: TCategory | null = await listCategoriesRelationRealEstateService(id)

    return resp.status(200).json(categories)
}