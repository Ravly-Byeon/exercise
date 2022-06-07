import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUser: LoginUserDto){
    const user = await this.userModel.findOne({email: loginUser.email});
    console.log(user,'user');
    console.log(loginUser.password, user.password);
    if(user){
      /*const valid = await bcrypt.compare(loginUser.password, user.password);
      console.log(valid, 'vv');
      if(valid){*/
      if(loginUser.password === user.password){
        return user;
      }else{
        return 'N';
      }
    }else{
      return 'N';
    }
  }

}
