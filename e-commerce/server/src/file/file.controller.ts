import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { extname } from 'path';
import { FileService } from './file.service';
import { MAX_FILE_SIZE } from 'src/constants';

@Controller('file')
export class FileController {
  constructor(private fileData: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          try {
            const randomNumber = Math.round(Math.random() * 1e9);
            const fileName = file.originalname.split('.')[0];
            callback(
              null,
              `${fileName}_${randomNumber}${extname(file.originalname)}`,
            );
          } catch (error) {
            if (error instanceof MulterError) {
              throw new Error('Unable to upload file ' + error);
            }

            throw new Error(error);
          }
        },
      }),
    }),
  )
  async uploadFile(
    @Body() data,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: MAX_FILE_SIZE,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.fileData.uploadFile(data, file);
  }
}
