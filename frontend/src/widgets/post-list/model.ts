import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Response, PaginationOptions, Store } from '../../shared/types';

import { Post, postApi } from '../../entity/post';

import { postListApi } from './api';

// Вынести общую типизацию для отдельного Item + для List Store
export interface PostListState {
  data: Response.ListWithPagination<Post>['items'];
  meta: Response.ListWithPagination<Post>['meta'];
  status: Store.Status;
  error: string | null;
}

const initialState: PostListState = {
  data: [],
  meta: {
    totalItems: 1, // для корректного отображения Antd Pagination
    itemCount: 0,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  },
  status: 'idle',
  error: null,
};

export const fetchPostList = createAsyncThunk(
  'post/list',
  // PaginationOptions -> PaginationPayload?
  async ({ page, limit }: PaginationOptions) => {
    const data = await postListApi.fetchPostList(page, limit);

    // Тоже для скелетона. Искуственная задержка. Знаю, что не очень красиво здесь это делать.
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return data;
  },
);

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        // Специально обнуляю список для скелетона
        state.data = [];
        state.status = 'pending';
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.data = action.payload.items;
        state.meta = action.payload.meta;
        state.status = 'fulfilled';
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        state.data = [];
        state.status = 'rejected';
        state.error = action.error.message || 'Error';
      });
  },
});
