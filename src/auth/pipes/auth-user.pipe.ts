import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthUserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: string) {
    const user = await this.usersService.findUser(value);
    if (!user) throw new NotFoundException('User does not exist');

    return value;
  }
}
