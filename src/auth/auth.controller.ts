import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() userInfo: RegisterDto) {
    return this.authService.register(userInfo);
  }

  @Post('login')
  @Public()
  async login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
}
