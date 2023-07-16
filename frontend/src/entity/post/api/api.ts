import { api } from '../../../shared/api';

import { Post } from '../model/types';

export const getPostById = async (id: number) => {
  const data = await api.get(`posts/${id}`).json<Post>();

  return data;
};

export const createPost = async (title: string, description: string) => {
  const data = await api
    .post('posts', {
      json: {
        title,
        description,
      },
    })
    .json<Post>();

  return data;
};
