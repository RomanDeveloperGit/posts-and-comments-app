import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Store } from '../../shared/types';

import { Post, postApi } from '../../entity/post';
import { Comment } from '../../entity/comment';

import { postDetailsApi } from './api';

export interface PostDetailsState {
  post: Store.ServerItemState<Post | null>;
  commentList: Store.ServerListState<Comment>;
}

const initialState: PostDetailsState = {
  post: {
    data: null,
    status: 'idle',
    error: null,
  },
  commentList: {
    data: [],
    meta: {
      totalItems: 1,
      itemCount: 0,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
    status: 'idle',
    error: null,
  },
};

type PostPayload = {
  id: number;
};

type CommentsPayload = PostPayload & Store.PaginationPayload;

export const getPostById = createAsyncThunk(
  'post/one',
  async ({ id }: PostPayload) => {
    const data = await postApi.getPostById(id);

    return data;
  },
);

export const getCommentListByPostId = createAsyncThunk(
  'post/one/comments',
  async ({ id, page, limit }: CommentsPayload) => {
    const data = await postDetailsApi.getCommentListByPostId(id, page, limit);

    return data;
  },
);

// Однотипный слайс тоже можно в шаред кинуть - надстройку какую-нибудь.
export const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    setPostData(state, action: PayloadAction<Post>) {
      state.post.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostById.pending, (state) => {
        state.post.data = null;
        state.post.status = 'pending';
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post.data = action.payload;
        state.post.status = 'fulfilled';
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.post.data = null;
        state.post.status = 'rejected';
        state.post.error = action.error.message || 'Error';
      });

    builder
      .addCase(getCommentListByPostId.pending, (state) => {
        state.commentList.data = [];
        state.commentList.status = 'pending';
      })
      .addCase(getCommentListByPostId.fulfilled, (state, action) => {
        state.commentList.data = action.payload.items;
        state.commentList.meta = action.payload.meta;
        state.commentList.status = 'fulfilled';
      })
      .addCase(getCommentListByPostId.rejected, (state, action) => {
        state.commentList.data = [];
        state.commentList.status = 'rejected';
        state.commentList.error = action.error.message || 'Error';
      });
  },
});
