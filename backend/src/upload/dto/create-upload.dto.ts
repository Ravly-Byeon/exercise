import {IsString} from "class-validator";

export class CreateUploadDto {
    @IsString()
    _id_user: string;

    @IsString()
    type: string;
    files: Array<Express.Multer.File>

}
