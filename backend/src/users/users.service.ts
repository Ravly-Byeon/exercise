import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import mongoose, {Model, Schema} from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User.name)
      private userModel: Model<UserDocument>
  ) {
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const pw = await this.transformPW(updateUserDto.password);
      updateUserDto.password = pw;
      const user = this.userModel.updateOne(
          {email: id},
          {...updateUserDto}
      )
      return user;
    }catch (e) {
      throw new Error(e);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUser: LoginUserDto){
    const user = await this.userModel.findOne({email: loginUser.email});
    if(user){
      /*const valid = await bcrypt.compare(loginUser.password, user.password);
      console.log(valid, 'vv');
      if(valid){*/
      const valid = await bcrypt.compare(loginUser.password, user.password);
      console.log(valid,'!!');
      if(valid){
          return user;
      }else{
        return 'N';
      }


    }else{
      return 'N';
    }
  }

  async randomStr(){
    const crypto = require("crypto");
    const str = crypto.randomBytes(5).toString('hex');
    return str;
  }

  async emailChk(userEmail:string){
    return await this.userModel.findOne({email:userEmail, isUse:true});
  }

  async signup(userData: CreateUserDto){
    const pw = await this.transformPW(userData.password);
    userData.password = pw;
    const date = new Date();
    console.log(date);
    const id = new mongoose.mongo.ObjectId();
    const data = {
      ...userData,
      _id: id,
      isUse: true,
      createAt: date,
    }
    console.log(data);
    return await this.userModel.create({...data});
  }

  async transformPW(pw: string): Promise<string>{
    pw = await bcrypt.hash(pw,10);
    return pw;
  }


}
