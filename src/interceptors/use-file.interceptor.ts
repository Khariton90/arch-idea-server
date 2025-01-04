import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNameEditor, imageFileFilter } from '../config/file.config';
import { FILE_UPLOAD_DIR } from '../app.constants';

export function UseFileInterceptor() {
  return FileInterceptor('file', {
    storage: diskStorage({
      filename: fileNameEditor,
      destination: FILE_UPLOAD_DIR,
    }),
    limits: {
      fileSize: 1000 * 1000 * 10,
    },
    fileFilter: imageFileFilter,
  });
}
