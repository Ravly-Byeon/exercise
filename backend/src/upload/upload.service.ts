import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UploadService {
  constructor(
      private config: ConfigService
  ) {  }
  async create(createUploadDto: CreateUploadDto) {
    try{
      return 'This action adds a new upload';
    }catch (e) {
      console.log(e);
    }
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
