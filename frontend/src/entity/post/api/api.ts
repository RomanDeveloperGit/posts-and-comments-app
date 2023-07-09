import { api } from '../../../shared/api';

import { Post } from '../model/types';

export const fetchPostById = async (id: number) => {
  const data = await api.get(`posts/${id}`).json<Post>();

  return data;
};
