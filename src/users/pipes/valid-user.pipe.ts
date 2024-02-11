import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class ValidUserPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  async transform(value: string) {
    const user = await this.usersService.findUser(value);
    if (!user) throw new NotFoundException('User does not exist');

    return value;
  }
}
