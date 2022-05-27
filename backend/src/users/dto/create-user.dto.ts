import {IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    _id: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    nickname: string;

    @IsString()
    region: string;
}
