import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Spin, Typography } from 'antd';

import { PAGINATION } from '../../shared/config';
import { SkeletonItem } from '../../shared/ui';

import { PostContent } from '../../entity/post';

import { CommentList } from '../../widgets/comment-list';

import {
  fetchCommentListByPostId,
  fetchPostById,
  postDetailsSlice,
} from './model';

import styles from './styles.module.scss';

export const PostDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const postId = useMemo(() => Number(id), [id]);

  const dispatch = useDispatch<RootDispatch>();
  // Подумать, можно ли как-то запретить лазить отсюда в чужие стейты?
  // ( Страница может лазить в разные стейты, это вопрос в целом )
  // Либо правила в проект вводить + обязывать создавать селекторы в модели, чтобы...
  // ...не было даже возможности физически( по типизации ) залезть в другой стейт.
  const post = useSelector((state: RootState) => state.postDetails.post.data);

  const postList = useSelector((state: RootState) => state.postList.data);
  const foundPostInListById = useMemo(
    () => postList.find((post) => post.id === postId),
    [postList],
  );

  const commentList = useSelector(
    (state: RootState) => state.postDetails.commentList,
  );

  const handleFetchCommentListByPostId = (commentPage: number) => {
    dispatch(
      fetchCommentListByPostId({
        id: postId,
        page: commentPage,
        limit: PAGINATION.ITEMS_PER_PAGE,
      }),
    );
  };

  useEffect(() => {
    if (!postId) {
      navigate('/');
      return;
    }

    // Пусть грузит асинхронно( вдруг данные в postList были загружены минут 10 назад, а за эти...
    // ...10 минут уже отредачили пост )
    dispatch(fetchPostById({ id: postId }));

    // Для улучшения UX подгрузим те данные, которые есть в сторе( если есть )
    if (foundPostInListById) {
      dispatch(postDetailsSlice.actions.putPostFromList(foundPostInListById));
    }

    handleFetchCommentListByPostId(1);
  }, []);

  console.log('Post details');

  return (
    <Layout>
      <Typography.Title>{post ? post.title : <Spin />}</Typography.Title>
      <div className={styles.post}>
        <SkeletonItem loading={!post} paragraph={{ rows: 5 }}>
          {post && (
            <PostContent
              description={post.description}
              createdAt={post?.createdAt}
              updatedAt={post?.updatedAt}
            />
          )}
        </SkeletonItem>
      </div>
      <CommentList
        data={commentList.data}
        status={commentList.status}
        itemsPerPage={commentList.meta.itemsPerPage}
        totalElementsCount={commentList.meta.totalItems}
        handleFetchCommentList={handleFetchCommentListByPostId}
      />
    </Layout>
  );
};
