import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {userName, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({userName});

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = {userName}
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }
        else
            throw new UnauthorizedException('login failed');
    }
}
