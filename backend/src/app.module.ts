import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

import { Post } from './posts/posts.entity';
import { Comment } from './comments/comments.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env.${process.env.NODE_ENV}.local`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [Post, Comment],
        synchronize: true,
      }),
    }),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
