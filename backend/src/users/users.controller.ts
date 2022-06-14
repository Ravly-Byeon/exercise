import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {User} from "./entities/user.entity";
import {log} from "util";
import {AuthsService} from "../auths/auths.service";
import {EmailsService} from "../emails/emails.service";

@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private authsService: AuthsService,
      private emailsService: EmailsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/login')
  async login(@Body() loginUser: LoginUserDto) {
    console.log(loginUser);
    const user = await this.usersService.login(loginUser);
    console.log(user);
    if(user === 'N'){
      return user;
    }else{
      const { access_token } = await this.authsService.signToken(loginUser);
      console.log(access_token);
      const data = {
        ...loginUser,
        access_token,
      }
      console.log(data);
      return data;
    }
  }

  @Post('/emailSubmit')
  async emailSubmit(@Body() { email, name, password }){
    const userData = {
      email,
      password
    }
    const user = await this.usersService.emailChk(email);
    if(!user){
      const {access_token} = await this.authsService.signToken(userData);
      console.log(access_token,'acct');
      const rStr = await this.usersService.randomStr();
      console.log(rStr,'rand');
      await this.emailsService.emailSubmit(email, rStr);
      console.log(rStr,'rsTr');
      const form = {
        rStr,
        access_token
      }
      return form;
    }else{
      return 'N';
    }
  }

  @Post('/emailCert')
  async emailCert(@Body(){ token, email, password}){
    return await this.authsService.chkToken(token);
  }

  @Post('/signup')
  async signup(@Body()userData: CreateUserDto){
    return await this.usersService.signup(userData);
  }

}
