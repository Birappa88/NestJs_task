import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.models';
import { JwtService } from "@nestjs/jwt";
import { UserUpdateDto } from './userUpdate.dto';
import { Response, Request } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private jwtService: JwtService
  ) { }

  @Post()
  async createUser(@Body() userDto: User) {
    return this.appService.createUser(userDto)
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.appService.findByUsername( {username });
    console.log(user)
    if (!user) {
      throw new BadRequestException('invalid credentials...');
    }

    if (password !== user.password) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ username: user.username });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success'
    };
  }

  @Get('user')
  async readUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.appService.findByUsername({ username: data['username'] });

      return user;

    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string, @Body() updateData: UserUpdateDto
  ): Promise<User> {
    return this.appService.updateUser(id, updateData)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id)
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success'
    }
  }
} 