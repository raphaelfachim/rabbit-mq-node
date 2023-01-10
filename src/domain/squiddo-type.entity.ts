import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("squiddo_type")
export class SquiddoType {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    // @Column()
    // private localizations: Localization[];

    @ManyToOne(() => SquiddoType, (type) => type.goodAgainst)
    private thisType: SquiddoType;

    @OneToMany(() => SquiddoType, (type) => type.thisType)
    private goodAgainst: SquiddoType[];

}