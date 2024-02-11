import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from 'src/shared/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userInfo: createUserDto) {
    return this.authService.register(userInfo);
  }

  @Post('login')
  async logIn(@Body('username') username: string) {
    username;
    return this.authService.login();
  }
}
