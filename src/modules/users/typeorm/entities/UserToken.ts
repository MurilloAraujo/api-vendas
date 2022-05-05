import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn  } from "typeorm";

@Entity("users_tokens")
export default class UserToken {

    @PrimaryGeneratedColumn("increment")
    id: number


    @Generated("uuid")
    @Column()
    token: string


    @Column()
    user_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}