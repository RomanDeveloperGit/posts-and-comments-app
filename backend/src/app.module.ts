import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

import { Post } from './posts/posts.entity';
import { Comment } from './comments/comments.entity';

// Добавить env

@Module({
  controllers: [],
  providers: [],
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mock-api-db',
      entities: [Post, Comment],
      synchronize: true,
    }),
    CommentsModule,
  ],
})
export class AppModule {}
