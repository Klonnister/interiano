import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from '../users/decorators/user.decorator';

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

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@User('username') username: string) {
    return this.authService.getProfile(username);
  }
}
