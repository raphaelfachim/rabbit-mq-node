import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SquiddoType } from "./squiddo-type.entity";

@Entity("squiddos")
export class Squiddo {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column({
        name: "squiddo_type"
    })
    private type: SquiddoType;

    @Column({
        name: "base_hp"
    })
    private baseHp: number;

    @Column({
        name: "base_attack"
    })
    private baseAttack: number;

    @Column({
        name: "defense_defense"
    })
    private baseDefense: number;

    @Column({
        name: "hp_multiplier"
    })
    private hpMultiplier: number;

    @Column({
        name: "attack_multiplier"
    })
    private attackMultiplier: number;

    @Column({
        name: "defense_multiplier"
    })
    private defenseMultiplier: number;
}