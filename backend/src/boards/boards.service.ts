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

  async findAll() {
    return await this.boardModel.find({
      isUse: true,
    }).sort({createAt:-1}).exec();
  }

  async findOne(category: string) {
    return await this.boardModel.find({
      isUse:true,
      category: category,
    }).sort({createAt:-1}).exec();
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }

  async makeExcel(){
    return await this.boardModel.find();
  }
}
