import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import * as mongoose from 'mongoose';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";

@Module({
  imports: [
      UsersModule,
      BoardsModule,
      MongooseModule.forRoot(process.env.MONGO_URL),
      ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
    private readonly idDev: boolean = process.env.MODE === 'dev'? true: false;

    configure(consumer: MiddlewareConsumer){
        consumer.apply(LoggerMiddleware).forRoutes('*');
        mongoose.set('debug',this.idDev);
    }
}
