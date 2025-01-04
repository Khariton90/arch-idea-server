import { join } from 'path';

export const ENV_FILE_PATH = '../.env';
export const FILE_UPLOAD_DIR = join(process.cwd(), process.env.FILE_UPLOAD_DIR);
export const FILE_TYPE_BAD_REQUEST_MESSAGE =
  'File must b of type /.(jpg|jpeg|png|webp|avif';
