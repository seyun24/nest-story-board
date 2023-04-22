import {IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    userName: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: `password only accepts english and number`
    })
    password: string;
}