import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProfileDto, UpdatePasswordDto } from './dto/profile.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getProfile(id: number) {
    return this.usersService.getUserProfile(id);
  }

  async updateProfile(username: string, data: ProfileDto): Promise<ProfileDto> {
    const foundUser = await this.usersService.findUser(username);
    if (!foundUser) throw new NotFoundException('Este usuario no existe.');

    return await this.usersService.updateUserProfile(username, data);
  }

  async updatePassword(userName: string, data: UpdatePasswordDto) {
    const foundUser = await this.usersService.findUser(userName);
    if (!foundUser) throw new NotFoundException('Este usuario no existe.');

    const isValidPassword = await bcrypt.compare(
      data.oldpassword,
      foundUser.password,
    );
    if (!isValidPassword)
      throw new BadRequestException('La contraseña es incorrecta.');

    const isSamePassword = await bcrypt.compare(
      data.newpassword,
      foundUser.password,
    );
    if (isSamePassword)
      throw new BadRequestException('Seleccione otra contraseña.');

    const password = await bcrypt.hash(data.newpassword, 10);
    const user = await this.usersService.updatePassword(foundUser.id, password);

    const payload = { id: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      username: user.username,
      role: user.role,
      image: user.image,
    };
  }
}
