import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { UserSchema } from './user.models';
import { ChatGateway } from './chat.gateway';
// import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [
    // AuthModule,
    PassportModule,
    MongooseModule.forRoot('mongodb+srv://Birappa:MangoDB@cluster0.m5phg.mongodb.net/apostrfy?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:'user', schema:UserSchema}]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  })
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtService, AuthService, ChatGateway ],
})
export class AppModule {}