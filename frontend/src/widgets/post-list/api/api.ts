import { api } from '../../../shared/api';
import type { Response } from '../../../shared/types';

import { Post } from '../../../entity/post';

export const fetchPostList = async (page: number, limit: number) => {
  const data = await api
    .get('posts', {
      searchParams: {
        page,
        limit,
      },
    })
    .json<Response.ListWithPagination<Post>>();

  return data;
};
