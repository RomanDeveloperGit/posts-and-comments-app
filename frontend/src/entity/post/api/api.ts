// /api/v1/posts, GET
// /api/v1/posts/:id, GET
// /api/v1/posts, POST
// /api/v1/posts/:id, PATCH
// /api/v1/posts/:id, DELETE

// /api/v1/posts/:postId/comments, GET
// /api/v1/posts/:postId/createComment, POST
// /api/v1/posts/:postId/comments/:commentId, PATCH
// /api/v1/posts/:postId/comments/:commentId, DELETE

import { api } from '../../../shared/api';

import { Post } from '../model/types';

export const fetchPostById = async (id: number) => {
  const data = await api.get(`posts/${id}`).json<Post>();

  return data;
};
