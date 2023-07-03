import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';

import { UpdateCommentDto } from 'src/shared-dto/update-comment.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentWithoutPostIdDto } from './dto/create-comment-without-post-id.dto';

import { CommentsService } from '../comments/comments.service';

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.postsService.getPosts(page, limit);
  }

  @Get('/:id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return await this.postsService.createPost(dto);
  }

  @Patch('/:id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return await this.postsService.updatePost(id, dto);
  }

  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePost(id);
  }

  @Get('/:postId/comments')
  async getCommentsInPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.commentsService.getCommentsByPostId(postId, page, limit);
  }

  @Post('/:postId/createComment')
  async createCommentInPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentWithoutPostIdDto,
  ) {
    const newComment = await this.commentsService.createComment({
      postId,
      ...dto,
    });

    delete newComment.postId;

    return newComment;
  }

  @Patch('/:postId/comments/:commentId')
  async updateCommentInPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return await this.commentsService.updateComment(commentId, postId, dto);
  }

  @Delete('/:postId/comments/:commentId')
  async deleteCommentInPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.commentsService.deleteComment(commentId, postId);
  }
}
