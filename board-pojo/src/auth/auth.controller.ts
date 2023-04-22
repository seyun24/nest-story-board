import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentials);
    }

    @Get('/signIn')
    signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto): Promise<string> {
        return this.authService.signIn(authCredentials);
    }
}
