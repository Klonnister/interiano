import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

const getImageOptions = (destinationPath: string): MulterOptions => {
  return {
    limits: {
      files: 1,
      fileSize: 2 * 1024 * 1024,
    },

    storage: diskStorage({
      destination: destinationPath,
      filename: (req, file, cb) => {
        const time = new Date().getTime();

        // Get file extension
        const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));

        // Generate name and validate extension
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
  };
};

export default getImageOptions;
