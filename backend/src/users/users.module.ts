import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User, UserSchema} from "./schemas/user.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {JwtModule} from "@nestjs/jwt";
import {AuthsService} from "../auths/auths.service";

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: User.name, schema: UserSchema},
      ]),
      JwtModule.register({
          secret: process.env.JWT_KEY+'',
          signOptions: { expiresIn: '5m'}
      })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthsService],
    exports: [UsersService]
})
export class UsersModule {}
