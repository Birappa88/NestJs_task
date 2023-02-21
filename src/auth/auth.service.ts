import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AppService } from '../app.service';

@Injectable()
export class AuthService {
  constructor(
    // private appService: AppService,
    private jwtService: JwtService,
  ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.appService.findByUsername(username);
//     if (user && user.password === password) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
