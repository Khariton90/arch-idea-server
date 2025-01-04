import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UseFileInterceptor } from './interceptors/use-file.interceptor';
import { IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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
    return {
      filename: file.filename,
      size: file.size,
      dto,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':filename')
  findOne(@Param('filename') image: string, @Res() res: Response) {
    try {
      return res.sendFile(image, { root: './public' });
    } catch {
      throw new NotFoundException();
    }
  }
}
