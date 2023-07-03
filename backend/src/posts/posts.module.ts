import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsModule } from 'src/comments/comments.module';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Post]), CommentsModule],
})
export class PostsModule {}
