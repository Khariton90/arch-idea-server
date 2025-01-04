import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { FILE_TYPE_BAD_REQUEST_MESSAGE } from '../app.constants';

export const fileNameEditor = (
  _: Request,
  file: Express.Multer.File,
  cb: (err: Error, filename: string) => void,
) => {
  const newFileName = `image-${file.originalname}`;
  cb(null, newFileName);
};

export const imageFileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: (err: Error, valid: boolean) => void,
) => {
  if (
    !file.originalname ||
    !file.originalname.match(/\.(jpg|jpeg|png|webp|avif)$/)
  ) {
    return cb(new BadRequestException(FILE_TYPE_BAD_REQUEST_MESSAGE), false);
  }

  return cb(null, true);
};
