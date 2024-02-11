import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from 'src/auth/dto/auth.dto';
import { AuthUserPipe } from './pipes/auth-user.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userInfo: registerDto) {
    return this.authService.register(userInfo);
  }

  @Post('login')
  async login(@Body('username', AuthUserPipe) username: string) {
    return this.authService.login(username);
  }
}
