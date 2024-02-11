import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from 'src/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userInfo: registerDto) {
    return this.authService.register(userInfo);
  }

  @Post('login')
  async logIn(@Body('username') username: string) {
    username;
    return this.authService.login();
  }
}
