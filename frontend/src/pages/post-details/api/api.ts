import { api } from '../../../shared/api';
import type { Response } from '../../../shared/types';

import { Comment } from '../../../entity/comment/model/types';

// Надо ли задать общий интерфейс для таких функций, где передается page, limit?
export const getCommentListByPostId = async (
  postId: number,
  page: number,
  limit: number,
) => {
  const data = await api
    .get(`posts/${postId}/comments`, {
      searchParams: {
        page,
        limit,
      },
    })
    .json<Response.List<Comment>>();

  return data;
};
