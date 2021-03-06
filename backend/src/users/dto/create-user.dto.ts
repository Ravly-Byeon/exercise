import {IsBoolean, IsDate, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nickname: string;

    @IsString()
    region: string;
}
