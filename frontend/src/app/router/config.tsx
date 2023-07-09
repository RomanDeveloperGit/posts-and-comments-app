import { createBrowserRouter } from 'react-router-dom';

import { PostsPage } from '../../pages/posts';
import { PostDetailsPage } from '../../pages/post-details';
import { NotFoundPage } from '../../pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PostsPage />,
  },
  {
    path: '/posts/:id',
    element: <PostDetailsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
