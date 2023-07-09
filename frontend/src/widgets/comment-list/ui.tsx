import { FC } from 'react';

import { Store } from '../../shared/types';
import { ListWithPagination } from '../../shared/ui';

import { Comment, CommentCard } from '../../entity/comment';

type Props = {
  data: Comment[];
  status: Store.Status;
  itemsPerPage: number;
  totalElementsCount: number;
  handleGetCommentList: (page: number) => void;
};

// Его нужно положить в виджеты В СТРАНИЦУ? Ведь это просто UI-отображалка именно к той странице.
// Её можно переиспользовать, но тут завязка на сущность комментария, при этом смысл компонента
// В отображении листа для определенной страницы. Хотя, при добавлении новых страниц с комментариями...
// ...допускаю использование этого компонента.
export const CommentList: FC<Props> = ({
  data,
  status,
  itemsPerPage,
  totalElementsCount,
  handleGetCommentList,
}) => {
  return (
    <ListWithPagination
      status={status}
      itemsPerPage={itemsPerPage}
      totalElementsCount={totalElementsCount}
      handleGetList={handleGetCommentList}
    >
      {data?.map((comment) => (
        <CommentCard
          author={`Автор: ${comment.author}`}
          content={`Комментарий: ${comment.content}`}
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
          key={comment.id}
        />
      ))}
    </ListWithPagination>
  );
};
