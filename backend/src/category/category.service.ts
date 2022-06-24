import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Category, CategoryDocument} from "./schemas/category.schema";
import mongoose, {Model} from "mongoose";

@Injectable()
export class CategoryService {
  constructor(
      @InjectModel(Category.name)
      private categoryModel: Model<CategoryDocument>,
  ) {
  }

  create() {
    try{
      const categoryList = [
          '여성의류',
          '남성의류',
          '잡화',
          '도서/티켓/음반',
          '가전/디지털기기',
          '가구/인테리어',
          '식품',
          '화장품/미용',
          '반려동물',
          '취미/스포츠/레저',
          '자동차',
          '생활용품',
      ]
      categoryList.forEach((value, idx)=>{
        let id = new mongoose.mongo.ObjectId();
        let category = {
          _id: id,
          name: value
        }
        this.categoryModel.create({...category});
      })
    }catch (e) {
      throw new Error(e)
    }
  }

  async findAll() {
    try{
      const categoryList = this.categoryModel.find().exec();
      console.log(categoryList);
      return categoryList;
    }catch (e) {
      throw new Error(e)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
