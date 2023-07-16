import { useDispatch } from 'react-redux';
import { Space, Typography } from 'antd';

import { Page } from '../../shared/ui';

import { CreatePost } from '../../features/create-post';

import {
  PostList,
  createPost,
  retryGetCurrentPostList,
} from '../../widgets/post-list';

export const PostsPage = () => {
  const dispatch = useDispatch<RootDispatch>();

  const handleCreate = async (title: string, description: string) => {
    await dispatch(
      createPost({
        title,
        description,
      }),
    );

    // Для добавления нового элемента в список текущей страницы, ...
    // ...либо обновления метаданных( добавить новую страницу в пагинацию )
    await dispatch(retryGetCurrentPostList());
  };

  return (
    <Page>
      <Typography.Title>PostsPage</Typography.Title>
      <Space direction='vertical'>
        <CreatePost handleCreate={handleCreate} />
        <PostList />
      </Space>
    </Page>
  );
};
