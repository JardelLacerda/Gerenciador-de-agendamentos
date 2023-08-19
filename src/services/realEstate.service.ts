import { addressRepo, realEstateRepo } from "../data-source";
import AppError from "../error";
import { TAddress } from "../interfaces/address.interface";
import { TCategory } from "../interfaces/categories.interface";
import { TRealEstate, TRealEstateRequest } from "../interfaces/realEstate.interface";

export const createRealEstateService = async (payload: TRealEstateRequest, foundCategory: TCategory): Promise<TRealEstate> => {
    const {address, categoryId, ...moreRealEstate} = payload

    const {number, ...moreAddres} = address

    const addressAlreadyExist: TAddress | null = await addressRepo.findOneBy({
        ...moreAddres,
        number: number ? number : ""
    }) 

    if(addressAlreadyExist){
        throw new AppError("Address already exists", 409)
    }

    const newAddres: TAddress = addressRepo.create({
        ...address
    }) 

    await addressRepo.save(newAddres)

    const newRealEstate: TRealEstate = realEstateRepo.create({
        ...moreRealEstate,
        address: newAddres,
        category: foundCategory
    })

    await realEstateRepo.save(newRealEstate)

    return newRealEstate



}

export const readRealEstateService =  async (): Promise<TRealEstate[]> => {
    const listRealEstates: TRealEstate[] | null = await realEstateRepo.find({
        relations: {
            address: true
        }
    })   

    return listRealEstates
}