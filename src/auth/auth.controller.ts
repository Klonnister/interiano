import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userInfo: RegisterDto) {
    return this.authService.register(userInfo);
  }

  @Post('login')
  async login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
}
