import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, Spin, Typography } from 'antd';

import { PAGINATION } from '../../shared/config';
import { Page, SkeletonItem } from '../../shared/ui';

import { PostContent } from '../../entity/post';

import { CommentList } from '../../widgets/comment-list';

import {
  getCommentListByPostId,
  getPostById,
  postDetailsSlice,
} from './model';

import styles from './styles.module.scss';

export const PostDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const postId = useMemo(() => Number(id), [id]);

  const dispatch = useDispatch<RootDispatch>();
  const post = useSelector((state: RootState) => state.postDetails.post.data);

  const postList = useSelector((state: RootState) => state.postList.data);
  const foundPostInListById = useMemo(
    () => postList.find((post) => post.id === postId),
    [postList],
  );

  const commentList = useSelector(
    (state: RootState) => state.postDetails.commentList,
  );

  const handleGetCommentListByPostId = (commentPage: number) => {
    dispatch(
      getCommentListByPostId({
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
    dispatch(getPostById({ id: postId }));

    // Для улучшения UX подгрузим те данные, которые есть в сторе( если есть )
    if (foundPostInListById) {
      dispatch(postDetailsSlice.actions.setPostData(foundPostInListById));
    }

    handleGetCommentListByPostId(1);
  }, []);

  return (
    <Page>
      <Typography.Title>Пост: {post ? post.title : <Spin />}</Typography.Title>
      <div className={styles.post}>
        <SkeletonItem loading={!post} paragraph={{ rows: 5 }}>
          {post && (
            <PostContent
              description={post.description}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          )}
        </SkeletonItem>
      </div>
      <div className={styles.commentBox}>
        <Typography.Title level={3}>
          Комментарии{' '}
          {!commentList.data.length && commentList.status === 'fulfilled'
            ? 'отсутствуют'
            : null}
        </Typography.Title>
        <CommentList
          data={commentList.data}
          status={commentList.status}
          itemsPerPage={commentList.meta.itemsPerPage}
          totalElementsCount={commentList.meta.totalItems}
          handleGetCommentList={handleGetCommentListByPostId}
        />
      </div>
    </Page>
  );
};
