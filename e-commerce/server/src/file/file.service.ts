import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(data, file: Express.Multer.File) {
    return {
      data,
      file,
    };
  }
}
