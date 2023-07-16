import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Store } from '../../../shared/types';

import { Post, postApi } from '../../../entity/post';

import { postListApi } from '../api';

import { CreatePostPayload } from './types';

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
  'post/list/get',
  async ({ page, limit }: Store.PaginationPayload) => {
    const data = await postListApi.getPostList(page, limit);

    return data;
  },
);

export const retryGetCurrentPostList = createAsyncThunk(
  'post/list/retryGetCurrent',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    dispatch(
      getPostList({
        page: state.postList.meta.currentPage,
        limit: state.postList.meta.itemsPerPage,
      }),
    );
  },
);

export const createPost = createAsyncThunk(
  'post/one/create',
  async ({ title, description }: CreatePostPayload) => {
    const data = await postApi.createPost(title, description);

    return data;
  },
);

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.pending, (state) => {
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
