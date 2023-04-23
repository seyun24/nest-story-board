import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Board} from "../boards/board.entity";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(['userName'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @OneToMany(type => Board, board => board.user, {eager: true})
        //user를 가져올때 eager 이 true면 board까지 가져온다.
    boards: Board[];

    async validatePassword(password: string): Promise<boolean> {
        let isvalid = await bcrypt.compae(password, this.password)
        return isvalid;
    }
}