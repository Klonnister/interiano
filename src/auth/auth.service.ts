import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { createUserDto } from 'src/shared/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  register(userInfo: createUserDto) {
    return this.usersService.createUser(userInfo);
  }

  login() {
    return 'login';
  }
}
