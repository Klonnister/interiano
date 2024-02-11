import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register({ username, password }: RegisterDto) {
    const user = await this.usersService.findUser(username);
    if (user)
      throw new BadRequestException(
        'Este nombre de usuario ya está en uso, pruebe con otro.',
      );

    return this.usersService.createUser({
      username,
      password: await bcrypt.hash(password, 10),
    });
  }

  async login(userData: LoginDto) {
    const user = await this.usersService.findUser(userData.username);
    if (!user) throw new NotFoundException('Este usuario no existe.');

    user;
  }
}
