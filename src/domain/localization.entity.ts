import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("localization")
export class Localization {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;
}