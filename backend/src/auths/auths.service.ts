import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthsService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
  ) {
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signToken(user){
    const { email, password } = user;
    const payload = {
      username: email,
      password: password,
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async chkToken(accessToken: string){
    const decodedToken = this.jwtService.decode(accessToken);
    console.log(decodedToken,'***');

    //decodedToken 기간 체크
    const tokenExp = new Date(decodedToken['exp']*1000);
    const now = new Date();

    //남은 시간
    const betweenTime = Math.floor(
        (tokenExp.getTime() - now.getTime())/1000/60
    );

    //기간 만료
    if(betweenTime<0){
      return false;
    }else{
      return true;
    }
  }
}
