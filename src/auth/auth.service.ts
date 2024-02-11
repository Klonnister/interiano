import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register({ username, password }: registerDto) {
    return this.usersService.createUser({
      username,
      password: await bcrypt.hash(password, 10),
    });
  }

  login(username: string) {
    username;
    return 'login';
  }
}
