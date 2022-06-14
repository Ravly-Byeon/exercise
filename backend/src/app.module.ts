import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as mongoose from 'mongoose';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import {config} from "dotenv";
import { AuthsModule } from './auths/auths.module';
import { EmailsModule } from './emails/emails.module';
import configEmail from './config/email';
import {MailerModule} from "@nestjs-modules/mailer";
import * as path from "path";
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

config();

@Module({
  imports: [
      UsersModule,
      BoardsModule,
      MongooseModule.forRoot(process.env.MONGO_URL),
      ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
          load: [configEmail]
      }),
      AuthsModule,
      EmailsModule,
      MailerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>{
              console.log('====write [.env] by config: network ====');;
              console.log(config.get('email'));
              return {
                  ...config.get('email'),
                  template: {
                      dir: path.join(__dirname, '/templates/'),
                      adapter: new EjsAdapter(),
                      options: {
                          strict: true,
                      },
                  },
              };
          },
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
    /*private readonly idDev: boolean = process.env.MODE === 'dev'? true: false;

    configure(consumer: MiddlewareConsumer){
        consumer.apply(LoggerMiddleware).forRoutes('*');
        mongoose.set('debug',this.idDev);
    }*/
}
