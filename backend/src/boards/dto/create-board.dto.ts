import {IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString} from "class-validator";
import {UPLOAD} from "../../interface/upload";

export class CreateBoardDto {
    @IsString()
    @IsOptional()
    _id: string;

    @IsString()
    _id_user: string;

    @IsString()
    @IsOptional()
    _id_buyer: string;

    @IsString()
    category: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsString()
    content: string;

    @IsArray()
    @IsOptional()
    likeList: UPLOAD.ILike[];

    @IsArray()
    @IsOptional()
    chatList: string[];

    @IsArray()
    @IsOptional()
    fileList: UPLOAD.IFile[];

    @IsBoolean()
    @IsOptional()
    isSold: boolean;

    @IsBoolean()
    @IsOptional()
    isUse: boolean;

    @IsDate()
    @IsOptional()
    createAt: Date;

    @IsDate()
    @IsOptional()
    updateAt: Date;

}
