import { postListSlice } from '../../widgets/post-list';
import { postDetailsSlice } from '../../pages/post-details';

export const rootReducer = {
  postList: postListSlice.reducer,
  postDetails: postDetailsSlice.reducer,
};
