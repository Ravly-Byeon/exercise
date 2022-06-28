import {HttpException, HttpStatus} from "@nestjs/common";
import {diskStorage} from "multer";
import {existsSync, mkdirSync} from "fs";
import {extname} from "path";


export const multerOptions = {

    fileFilter: (request, file, callback) =>{
        if(file.mimetype.match(/\/(jpg|jpeg|png)$/)){
            callback(null, true);
        }else{
            callback(
                new HttpException(
                    {
                        message: 1,
                        error: '지원하지 않는 이미지 형식입니다.'
                    },
                    HttpStatus.BAD_REQUEST,
                ),
                false
            );
        }
    },
    storage: diskStorage({
        destination: (request, file, callback) =>{
            const uploadPath: string = 'public';
            if(!existsSync(uploadPath)){
                mkdirSync(uploadPath);
            }
            callback(null, uploadPath);
        },
        filename: (request, file, callback) =>{
            console.log(__dirname,'dirName');
            const randomName = Array(32).fill(null)
                .map(()=> Math.round(Math.random() *16).toString(16))
                .join('');
            callback(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
}

export const createImageURL = (file): string =>{
    const serverAddress: string = __dirname;
    return `${serverAddress}/public/${file.filename}`;
}