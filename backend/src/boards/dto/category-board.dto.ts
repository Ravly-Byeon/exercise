import {IsString} from "class-validator";

export class CategoryBoardDto{
    @IsString()
    _id: string;

    @IsString()
    name: string;
}