import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from 'src/shared/dto/user.dto';

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

  findUserByEmail(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
}
