import { NextFunction, Request, Response } from 'express';
import { TUser } from '../interfaces/users.interface';
import { categoryRepo, realEstateRepo, schedulesRepo, userRepo } from '../data-source';
import AppError from '../error';
import { TCategory } from '../interfaces/categories.interface';
import { TRealEstate } from '../interfaces/realEstate.interface';
import { TSchedules } from '../interfaces/schedules.interface';

const email = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {

    const findUserByEmail:TUser | null = await userRepo.findOneBy({email: req.body.email}) 
   
    if(findUserByEmail){
        throw new AppError("Email already exists", 409)
    }

    return next()
}

const isAdminOrOwner = (req: Request, resp: Response, next: NextFunction): void => {
    const { admin, id } = resp.locals
    const idParams = req.params.id
 
    if(!admin && Number(id) !== Number(idParams)){
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}

const isAdmin =  (req: Request, resp: Response, next: NextFunction): void => {
    const { admin } = resp.locals
 
    if(!admin){
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}

const categoryName = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body

    const foundCategory: TCategory | null = await categoryRepo.findOneBy({name: name}) 
    
    if(foundCategory){
        throw new AppError("Category already exists", 409)
    }

    return next()
}

const isUserExist = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const foundUser: TUser | null = await userRepo.findOneBy({id: Number(id)}) 

    if(!foundUser){
        throw new AppError("User not found", 404)
    }

    resp.locals.foundUser = foundUser

    return next()
}


const isCategoryExist = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
    let { id } = req.params

    if(!id){
        id = req.body.categoryId
    }

    const foundCategory: TCategory | null = await categoryRepo.findOneBy({id: Number(id)}) 

    if(!foundCategory){
        throw new AppError("Category not found", 404)
    }

    resp.locals.foundCategory = foundCategory

    return next()
}

const isRealEstateExist = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
    let { id } = req.params

    if(!id){
        id = req.body.realEstateId
    }

    const foundRealEstate: TRealEstate | null = await realEstateRepo.findOneBy({id: Number(id)}) 

    if(!foundRealEstate){
        throw new AppError("RealEstate not found", 404)
    }

    resp.locals.foundRealEstate = foundRealEstate

    return next()
}

const isValidOptionsScheduler = async(req: Request, resp: Response, next: NextFunction): Promise<void> => {
    const { date, hour } = req.body
    const { id } = resp.locals

    const [h] = hour.split(":")

    if(Number(h) > 18 || Number(h) < 8){
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
    }

    const day = new Date(date).getDay()
    
    if(day < 2 || day > 5 ){
        throw new AppError("Invalid date, work days are monday to friday", 400)
    }

    const queryBuilderDateAndHourUser: TSchedules | null 
    = await schedulesRepo.createQueryBuilder("schedule")
    .where("schedule.date = :date", {date})
    .andWhere("schedule.hour = :hour", {hour})
    .andWhere("schedule.userId = :id", {id})
    .getOne()

    if(queryBuilderDateAndHourUser){
        throw new AppError("User schedule to this real estate at this date and time already exists", 409)
    }

    const queryBuilderDateAndHour: TSchedules | null 
    = await schedulesRepo.createQueryBuilder("schedule")
    .where("schedule.date = :date", {date})
    .andWhere("schedule.hour = :hour", {hour})
    .getOne()
    
    if(queryBuilderDateAndHour){
        throw new AppError("Schedule to this real estate at this date and time already exists", 409)
    }

    return next()
}

export default { 
    email, 
    isAdminOrOwner,
    isAdmin, 
    isUserExist, 
    categoryName, 
    isCategoryExist,
    isRealEstateExist,
    isValidOptionsScheduler
}