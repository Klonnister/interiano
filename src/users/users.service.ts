import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile, createUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser({ username, password }: createUserDto) {
    return this.prisma.user.create({
      data: {
        username,
        password,
        role: 'admin',
      },
    });
  }

  findUser(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getProfile(username: string): Promise<Profile> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return {
      username: user.username,
      role: user.role,
    };
  }
}
