import {
  Body,
  Controller,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
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
  @Public()
  signUp(
    @Body() userInfo: RegisterDto,
    @UploadedFile() images: Express.Multer.File,
  ) {
    if (!images) console.log('no image uploaded');
    return this.authService.register(userInfo);
  }

  @Post('login')
  @Public()
  async login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
}
