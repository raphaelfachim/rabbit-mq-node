import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";


@Entity("characters")
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => User, (user) => user.character)
    @JoinColumn({
        name: "users_id"
    })
    user: User

    constructor( ) { }

}