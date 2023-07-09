import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Store } from '../../shared/types';

import { Post } from '../../entity/post';

import { postListApi } from './api';

const initialState: Store.ServerListState<Post> = {
  data: [],
  meta: {
    totalItems: 1, // для корректного отображения Antd Pagination при первой загрузке
    itemCount: 0,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  },
  status: 'idle',
  error: null,
};

export const getPostList = createAsyncThunk(
  'post/list',
  async ({ page, limit }: Store.PaginationPayload) => {
    const data = await postListApi.getPostList(page, limit);

    return data;
  },
);

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.pending, (state) => {
        // Специально обнуляю список для скелетона. С точки зрения UX - не очень, ...
        // ...но в тестовых целях сойдет.
        state.data = [];
        state.status = 'pending';
      })
      .addCase(getPostList.fulfilled, (state, action) => {
        state.data = action.payload.items;
        state.meta = action.payload.meta;
        state.status = 'fulfilled';
      })
      .addCase(getPostList.rejected, (state, action) => {
        state.data = [];
        state.status = 'rejected';
        state.error = action.error.message || 'Error';
      });
  },
});
