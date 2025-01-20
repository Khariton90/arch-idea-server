import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UseFileInterceptor } from './interceptors/use-file.interceptor';
import { IsOptional, IsString } from 'class-validator';
import { Response } from 'express';

export class CreateFileDto {
  @IsOptional()
  @IsString()
  public description?: string;
}

@Controller('images')
export class AppController {
  @Post('upload')
  @UseInterceptors(UseFileInterceptor())
  public async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    try {
      return {
        filename: file.filename,
        size: file.size,
        dto,
      };
    } catch {
      throw new NotFoundException();
    }
  }

  @Get(':filename')
  findOne(@Param('filename') image: string, @Res() res: Response) {
    try {
      return res.sendFile(image, { root: './public' });
    } catch {
      throw new NotFoundException();
    }
  }
}
