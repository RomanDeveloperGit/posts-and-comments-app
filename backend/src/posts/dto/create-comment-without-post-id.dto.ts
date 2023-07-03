import { OmitType } from '@nestjs/mapped-types';

import { CreateCommentDto } from 'src/shared-dto/create-comment.dto';

export class CreateCommentWithoutPostIdDto extends OmitType(CreateCommentDto, ['postId']) {}
