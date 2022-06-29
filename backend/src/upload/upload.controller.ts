import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles, Res, StreamableFile
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import {FilesInterceptor} from "@nestjs/platform-express";
import {ConfigService} from "@nestjs/config";
import {createImageURL, multerOptions} from "../lib/multerOptions";
import {createReadStream} from "fs";
import {join} from "path";

@Controller('upload')
export class UploadController {
  constructor(
      private readonly uploadService: UploadService,
      private config: ConfigService,
  ) {}

  @UseInterceptors(FilesInterceptor('fileList'))
  @Post('/:type/:userId')
  create(
      @UploadedFiles() files: Array<Express.Multer.File>,
      @Param('type') type: string,
      @Param('userId') userId: string,
    ) {
      console.log(files, __dirname);
      let arr = [];
      files.forEach((file)=>{
        //let path = file.path.replace(this.config.get('ATTATCH_SAVE_PATH'),'');
        const data = {
          filename: file.originalname,
          savedPath: file.path.replace(/\\/gi,'/'),
          size: file.size,
        };
        arr.push(data);
      });
      return arr;
    }

  /*@UseInterceptors(FilesInterceptor('images', null, multerOptions))
  @Post('/:type/:userId')
  create(
      @UploadedFiles() files: Array<Express.Multer.File>,
      @Param('type') type: string,
      @Param('userId') userId: string,
  ){
    console.log(__dirname,'???');
    let arr = [];
    files.forEach((file)=> {
      const data = {
        filename: file.originalname,
        savedPath: createImageURL(file),
        size: file.size,
      };
      arr.push(data);
    });
    return arr;
  }*/

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }

  @Get()
  getFile():StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
