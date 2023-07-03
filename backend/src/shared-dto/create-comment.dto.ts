import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  postId: number;
}
