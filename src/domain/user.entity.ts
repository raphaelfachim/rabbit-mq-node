import { JoinColumn, OneToOne } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Character } from "./character.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

    @Column()
    public age: number;

    @Column()
    public registration: string;

    @OneToOne(() => Character, (character) => character.user)
    @JoinColumn()
    public character: Character;

    @Column('timestamp')
    public createdAt: Date;

    constructor (name?: string, age?: number, registration?: string) {
        if(name) this.name = name;
        if(age) this.age = age;
        if(registration) this.registration = registration;
        this.createdAt = new Date();
    }
}