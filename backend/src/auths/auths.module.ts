import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
      UsersModule,
      JwtModule.register({
        secret: process.env.JWT_KEY+'',
        signOptions: {expiresIn: '5m'},
      }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, ConfigService]
})
export class AuthsModule {}
