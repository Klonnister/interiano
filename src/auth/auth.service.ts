import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  register(userInfo: registerDto) {
    return this.usersService.createUser(userInfo);
  }

  login() {
    return 'login';
  }
}
