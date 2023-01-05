import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

// @Entity()
export class User {
    // @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    public name: string;

    // @Column()
    public age: number;

    // @Column()
    public registration: string;

    constructor (name?: string, age?: number, registration?: string) {
        if(name) this.name = name;
        if(age) this.age = age;
        if(registration) this.registration = registration;
    }
}