import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';

@Module({
  controllers: [],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
})
export class CommentsModule {}
