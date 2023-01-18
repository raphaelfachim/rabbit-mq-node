import { JoinColumn, OneToOne, Table } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Character } from "./character.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

    @Column()
    private password: string;

    @Column()
    public birthDate: Date;

    @Column()
    public email: string;

    @OneToOne(() => Character, (character) => character.user)
    @JoinColumn({
        name: "characters_id"
    })
    public character: Character;

    @Column({
        name: "created_at",
        type: "timestamp"
    })
    public createdAt: Date;

    constructor (name?: string, password?: string, email?: string, birthDate?: Date) {
        if(name) this.name = name;
        if(password) this.password = password;
        if(email) this.email = email;
        if(birthDate) this.birthDate = birthDate;
        this.createdAt = new Date();
    }
}