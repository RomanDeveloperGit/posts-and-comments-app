import { FC } from 'react';

import { Space, Pagination } from 'antd';

import { Store } from '../../shared/types';
import { SkeletonList } from '../../shared/ui';

import { Comment, CommentCard } from '../../entity/comment';

import styles from './styles.module.scss';

type Props = {
  data: Comment[];
  status: Store.Status;
  itemsPerPage: number;
  totalElementsCount: number;
  handleFetchCommentList: (page: number) => void;
};

// Его нужно положить в виджеты В СТРАНИЦУ? Ведь это просто UI-отображалка.
export const CommentList: FC<Props> = ({
  data,
  status,
  itemsPerPage,
  totalElementsCount,
  handleFetchCommentList,
}) => {
  console.log('Comment-list', data);

  // Мб тут в shared/ui тоже вытащить общие элементы для List + Pagination
  // И пагинация не должна ли жить отдельно от листа?
  return (
    <div>
      <Space className={styles.space} direction="vertical">
        <SkeletonList
          length={3}
          loading={status === 'pending'}
          paragraph={{ rows: 6 }}
        >
          <Space className={styles.space} direction="vertical">
            {data?.map((comment) => (
              <CommentCard
                author={`Автор: ${comment.author}`}
                content={`Комментарий: ${comment.content}`}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                key={comment.id}
              />
            ))}
          </Space>
        </SkeletonList>
      </Space>
      {data.length ? (
        <Pagination
          onChange={handleFetchCommentList}
          pageSize={itemsPerPage}
          total={totalElementsCount}
        />
      ) : null}
    </div>
  );
};
