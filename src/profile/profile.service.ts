import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  getProfile(id: number) {
    return this.usersService.getUserProfile(id);
  }

  updateProfile(id: number, data: ProfileDto) {
    return this.usersService.updateUserProfile(id, data);
  }
}
