import { realEstateRepo, schedulesRepo, userRepo } from "../data-source";
import { TRealEstate } from "../interfaces/realEstate.interface";
import { TSchedules, TSchedulesRequest } from "../interfaces/schedules.interface";
import { TUser } from "../interfaces/users.interface";


export const createSchedulesService = async (payload: TSchedulesRequest, userId: number, foundRealEstate: TRealEstate): Promise<string> => {
    
    const {realEstateId, ...moreSchedule} = payload

    const foundUser: TUser | null = await userRepo.findOneBy({id: userId})

    const newSchedule: TSchedules = schedulesRepo.create({
        ...moreSchedule,
        realEstate: foundRealEstate,
        user: foundUser!
    }) 

    await schedulesRepo.save(newSchedule)

    return "Schedule created"

}

export const listSchedulesService = async (id: number): Promise<TRealEstate> => {
    const listSchedules: TRealEstate | null = await realEstateRepo.findOne({
        where: {
            id: id
        },
        relations:{
            address: true,
            category: true,
            schedules: {
                user: true
            }
        }
    })

    return listSchedules!
}