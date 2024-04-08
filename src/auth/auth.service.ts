import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password }: RegisterDto) {
    const users = await this.usersService.countUsers();
    if (users)
      throw new ForbiddenException(
        'Actualmente solo se puede registrar un usuario.',
      );

    const existentUser = await this.usersService.getUserByName(username);
    if (existentUser)
      throw new BadRequestException(
        'Este nombre de usuario ya está en uso, pruebe con otro.',
      );

    const user = await this.usersService.createUser({
      username,
      password: await bcrypt.hash(password, 10),
    });

    const payload = { sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      username: user.username,
      image: user.image,
    };
  }

  async login({ username, password }: LoginDto) {
    const user = await this.usersService.getUserByName(username);
    if (!user) throw new NotFoundException('Este usuario no existe.');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('La contraseña es incorrecta');

    const payload = { sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      username: user.username,
      image: user.image,
    };
  }
}
