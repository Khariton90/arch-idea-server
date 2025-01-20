import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async create(dto: CreateCommentDto, userId: string, ideaId: string) {
    const entity = new CommentEntity({ ...dto, userId, ideaId });
    try {
      return await this.commentRepository.create(entity);
    } catch {
      throw new BadRequestException();
    }
  }

  public async findAll(query: CommentQuery, ideaId: string) {
    try {
      return await this.commentRepository.findMany(query, ideaId);
    } catch {
      return [];
    }
  }

  public async findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  public async update(id: string, dto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  public async remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
