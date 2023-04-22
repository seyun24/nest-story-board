import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {userName, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({userName});

        if (user && (await bcrypt.compare(password, user.password)))
            return 'login success';
        else
            throw new UnauthorizedException('login failed');
    }
}
