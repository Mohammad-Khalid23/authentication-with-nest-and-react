import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/authenticationApp'),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
      ],
      envFilePath: ['.env'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
