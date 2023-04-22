import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';
import {ConflictException, InternalServerErrorException} from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCreateDto: AuthCredentialsDto): Promise<void> {
        const {userName, password} = authCreateDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            userName,
            password: hashedPassword
        });
        try {
            await this.save(user)
        } catch (error) {
            if(error.code === '23505')
                throw new ConflictException('Existing username');
            else {
                throw new InternalServerErrorException();
            }
        }
    }
}