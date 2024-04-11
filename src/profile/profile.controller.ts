import {
  Body,
  Get,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/users/decorators/user.decorator';
import { ProfileDto, UpdatePasswordDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { existsSync, unlinkSync } from 'fs';
import { ValidImagePipe } from 'src/images/pipes/valid-image.pipe';
import getImageOptions from '../images/helpers/imageOptionsHelper';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  profile(@User('sub') id: number): Promise<ProfileDto> {
    return this.profileService.getProfile(id);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', getImageOptions('./public/profile-imgs')),
  )
  async uploadProfileImage(
    @UploadedFile(ValidImagePipe) images: Express.Multer.File,
    @Body('previousImage') previousImage: string,
  ): Promise<string> {
    if (previousImage && existsSync(`./public${previousImage}`)) {
      unlinkSync(`./public${previousImage}`);
    }

    return `/profile-imgs/${images.filename}`;
  }

  @Patch()
  updateProfile(
    @User('sub') id: number,
    @Body() data: ProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.updateProfile(id, data);
  }

  @Patch('password')
  updatePassword(@User('sub') id: number, @Body() data: UpdatePasswordDto) {
    return this.profileService.updatePassword(id, data);
  }
}
