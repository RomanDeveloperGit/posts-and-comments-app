import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

import { CreateCommentDto } from 'src/shared-dto/create-comment.dto';
import { UpdateCommentDto } from 'src/shared-dto/update-comment.dto';

import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
  ) {}

  async getCommentsByPostId(postId: number, page: number, limit: number) {
    const queryBuilder = this.commentsRepository.createQueryBuilder('comment');
    queryBuilder.where('comment.postId = :postId', { postId });
    queryBuilder.orderBy('comment.createdAt', 'ASC');

    const comments = await paginate<Comment>(queryBuilder, { page, limit });

    comments.items.forEach((comment) => {
      delete comment.postId;
    });

    return comments;
  }

  async createComment(dto: CreateCommentDto) {
    const newComment = this.commentsRepository.create(dto);

    return await this.commentsRepository.save(newComment);
  }

  async updateComment(id: number, postId: number, dto: UpdateCommentDto) {
    return await this.commentsRepository.update(
      {
        id,
        postId,
      },
      dto,
    );
  }

  async deleteComment(id: number, postId: number) {
    return await this.commentsRepository.delete({
      id,
      postId,
    });
  }
}
