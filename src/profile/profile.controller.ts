import {
  BadRequestException,
  Body,
  Get,
  Controller,
  Patch,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { diskStorage } from 'multer';
import { User } from 'src/users/decorators/user.decorator';
import { ProfileDto, UpdatePasswordDto } from './dto/profile.dto';

import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  profile(@User('id') id: number): Promise<ProfileDto> {
    return this.profileService.getProfile(id);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', {
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        // Validate if public directory exists
        destination: async (req, file, cb) => {
          if (!existsSync('./public/profile/')) {
            await mkdir('./public/profile/');
          }

          cb(null, './public/profile/');
        },

        filename: (req, file, cb) => {
          // create image name
          const time = new Date().getTime();
          const ext = file.originalname.slice(
            file.originalname.lastIndexOf('.'),
          );
          const imageName = time + ext;
          const acceptedExts = ['.jpeg', '.jpg', '.png', '.webp', '.svg'];

          if (!acceptedExts.includes(ext)) {
            return cb(
              new UnsupportedMediaTypeException(
                'El archivo debe ser de tipo imagen.',
              ),
              null,
            );
          }

          return cb(null, imageName);
        },
      }),
    }),
  )
  async uploadProfileImage(
    @UploadedFile() images: Express.Multer.File,
  ): Promise<string> {
    if (!images)
      throw new BadRequestException(
        'Ninguna imagen seleccionada para guardar.',
      );
    return `/profile/${images.filename}`;
  }

  @Patch('password')
  updatePassword(
    @User('username') username: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return this.profileService.updatePassword(username, data);
  }
}
