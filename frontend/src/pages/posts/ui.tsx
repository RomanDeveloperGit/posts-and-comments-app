import { Typography } from 'antd';

import { PostList } from '../../widgets/post-list';

export const PostsPage = () => {
  return (
    <section>
      <Typography.Title>PostsPage</Typography.Title>
      <PostList />
    </section>
  );
};
