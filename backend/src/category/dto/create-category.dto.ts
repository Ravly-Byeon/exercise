import {IsString} from "class-validator";

export class CreateCategoryDto {
    @IsString()
    _id: string;

    @IsString()
    name: string;
}
