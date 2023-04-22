import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
@Unique(['userName'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;
}