import { categoryRepo } from "../data-source";
import { TCategory, TCategoryRequest } from "../interfaces/categories.interface";

export const createCategoryService = async (payload: TCategoryRequest): Promise<TCategory> => {

    const newCategory: TCategory = categoryRepo.create(payload)

    await categoryRepo.save(newCategory)

    return newCategory
}

export const listCategoryiesService = async (): Promise<TCategory[]> => {

    const categories: TCategory[] = await categoryRepo.find()
    
    return categories
}

export const listCategoriesRelationRealEstateService = async (id: number): Promise<TCategory | null> => {

    const categories: TCategory | null = await categoryRepo.findOne({
        where: {
            id: id
        },
        relations: {
            realEstate: true
        }
    })
    
    return categories
}