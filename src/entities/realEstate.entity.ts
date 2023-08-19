import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";

import Category from "./category.entity";
import Address from "./address.entity";
import Schedule from "./schedules.entity";
  
@Entity("real_estate")
class RealEstate {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "boolean", default: false })
    sold: boolean
    
    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    value: number | string

    @Column({ type: "integer" })
    size: number
    
    @CreateDateColumn({ type: "date" })
    createdAt: Date

    @UpdateDateColumn({ type: "date" })
    updatedAt: Date

    @ManyToOne(() => Category, {nullable: true})
    category: Category

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
    schedules: Schedule[]

}
  
export default RealEstate;