import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Category, CategoryDocument} from "./schemas/category.schema";
import mongoose, {Model} from "mongoose";
import {Board, BoardDocument} from "./schemas/board.schema";

@Injectable()
export class BoardsService {
  constructor(
      @InjectModel(Board.name)
      private boardModel: Model<BoardDocument>
  ) {
  }
  async create(createBoardDto: CreateBoardDto) {
    const id = new mongoose.mongo.ObjectId();
    const date = new Date();
    const insertData = {
      ...createBoardDto,
      _id: id,
      createAt: date,
      isSold: false,
      isUse: true,
    }
    return await this.boardModel.create({...insertData});
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
