import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

  async getPosts(page: number, limit: number) {
    const queryBuilder = this.postsRepository.createQueryBuilder('post');
    queryBuilder.orderBy('post.createdAt', 'ASC');

    return await paginate<Post>(queryBuilder, { page, limit });
  }

  async getPost(id: number) {
    return await this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createPost(dto: CreatePostDto) {
    const newPost = this.postsRepository.create(dto);

    return await this.postsRepository.save(newPost);
  }

  async updatePost(id: number, dto: UpdatePostDto) {
    return await this.postsRepository.update({ id }, dto);
  }

  async deletePost(id: number) {
    return await this.postsRepository.delete({ id });
  }
}
