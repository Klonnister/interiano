import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/user.dto';
import { ProfileDto } from 'src/profile/dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  countUsers() {
    return this.prisma.user.count();
  }

  async createUser({ username, password, image }: createUserDto) {
    return this.prisma.user.create({
      data: {
        username,
        password,
        image,
        role: 'admin',
      },
    });
  }

  findUser(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getUserProfile(id: number): Promise<ProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return {
      username: user.username,
      image: user.image,
    };
  }

  async updateUserProfile(
    username: string,
    data: ProfileDto,
  ): Promise<ProfileDto> {
    const user = await this.prisma.user.update({
      where: { username },
      data: {
        username: data.username,
        image: data.image,
      },
    });

    return {
      username: user.username,
      image: user.image,
    };
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        password,
      },
    });
  }
}
