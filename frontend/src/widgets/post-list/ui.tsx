import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Space, Pagination } from 'antd';

import { PAGINATION } from '../../shared/config';
import { SkeletonList } from '../../shared/ui';

import { PostCard } from '../../entity/post';

import { fetchPostList } from './model';

import styles from './styles.module.scss';

export const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<RootDispatch>();

  const postList = useSelector((state: RootState) => state.postList);

  const handleFetchPostList = (page: number) => {
    dispatch(
      fetchPostList({
        page,
        limit: PAGINATION.ITEMS_PER_PAGE,
      }),
    );
  };

  useEffect(() => {
    handleFetchPostList(1);
  }, []);

  console.log('Post-list', postList.status, postList.data, postList.meta);

  // Мб тут в shared/ui тоже вытащить общие элементы для List + Pagination
  // И пагинация не должна ли жить отдельно от листа?
  return (
    <div>
      <Space className={styles.space} direction="vertical">
        <SkeletonList
          length={3}
          loading={postList.status === 'pending'}
          paragraph={{ rows: 6 }}
        >
          <Space className={styles.space} direction="vertical">
            {postList.data?.map((post) => (
              <PostCard
                title={post.title}
                description={post.description}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                onClick={() => navigate(`/posts/${post.id}`)}
                key={post.id}
              />
            ))}
          </Space>
        </SkeletonList>
      </Space>
      {postList.data.length ? (
        <Pagination
          onChange={handleFetchPostList}
          pageSize={postList.meta.itemsPerPage}
          total={postList.meta.totalItems}
        />
      ) : null}
    </div>
  );
};
