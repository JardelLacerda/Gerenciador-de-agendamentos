import {
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";

import Schedules from "./schedules.entity";
  
@Entity("users")
class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 45 })
    name: string
    
    @Column({ type: "varchar", length: 45, unique: true })
    email: string

    @Column({ type: "varchar", length: 120 })
    password: string
    
    @Column({ type: "boolean", default: false })
    admin: boolean

    @CreateDateColumn({ type: "date" })
    createdAt: Date | string

    @UpdateDateColumn({ type: "date" })
    updatedAt: Date | string

    @DeleteDateColumn({ type: "date", nullable: true })
    deletedAt: Date | string | null | undefined

    @OneToMany(() => Schedules, (schedule) => schedule.user)
    schedules: Schedules[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      const isEncrypted: number = getRounds(this.password);
      if (!isEncrypted) {
        this.password = hashSync(this.password, 10);
      }
    }
}
  
export default User;