import {HttpException, HttpStatus, Module} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {diskStorage} from "multer";
import * as fs from "fs";
import {format} from "light-date";
import {extname} from "path";

@Module({
  imports:[
      MulterModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async(config: ConfigService) =>({
          fileFilter: (request, file, callback) =>{
            if(file.mimetype.match(/\/(jpg|jpeg|png)$/)){
              callback(null, true);
            }else{
              callback(
                  new HttpException(
                      {
                        message: 1,
                        error: '지원하지 않는 이미지 형식입니다.',
                      },
                      HttpStatus.BAD_REQUEST,
                  ),
                  false,
              );
            }
          },
          storage: diskStorage({
            /*destination: function (req, file, cb){
              const dest = `${config.get('ATTATCH_SAVE_PATH')}/${format(new Date(),'{yyyy}{MM}')}/`;
              if(!fs.existsSync(dest))  {
                fs.mkdirSync(dest, { recursive: true });
              }
              cb(null, dest);
            },*/
            destination: (req, file , cb) =>{

            },
            filename: (req, file, cb) =>{
              const randomName = Array(32).fill(null)
                  .map(()=> Math.round(Math.random() *16).toString(16))
                  .join('');
              return cb(null,`${randomName}${extname(file.originalname)}`);
            },
          }),
        }),
        inject: [ConfigService],
      }),
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
