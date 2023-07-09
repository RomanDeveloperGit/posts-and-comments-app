import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PAGINATION } from '../../shared/config';
import { ListWithPagination } from '../../shared/ui';

import { PostCard } from '../../entity/post';

import { getPostList } from './model';

export const PostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<RootDispatch>();

  const postList = useSelector((state: RootState) => state.postList);

  const handleGetPostList = (page: number) => {
    dispatch(
      getPostList({
        page,
        limit: PAGINATION.ITEMS_PER_PAGE,
      }),
    );
  };

  useEffect(() => {
    handleGetPostList(1);
  }, []);

  console.log('Post-list', postList.status, postList.data, postList.meta);

  return (
    <div>
      <ListWithPagination
        status={postList.status}
        itemsPerPage={postList.meta.itemsPerPage}
        totalElementsCount={postList.meta.totalItems}
        handleFetchList={handleFetchPostList}
      >
        {postLGetata?.map((poGet> (
          <PostCard
            title={post.title}
            description={post.description}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            onClick={() => navigate(`/posts/${post.id}`)}
            key={post.id}
          />
        ))}
      </ListWithPagination>
    </div>
  );
};
