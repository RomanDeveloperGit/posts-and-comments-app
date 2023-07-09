import { Typography } from 'antd';

import { Page } from '../../shared/ui';

import { PostList } from '../../widgets/post-list';

export const PostsPage = () => {
  return (
    <Page>
      <Typography.Title>PostsPage</Typography.Title>
      <PostList />
    </Page>
  );
};
