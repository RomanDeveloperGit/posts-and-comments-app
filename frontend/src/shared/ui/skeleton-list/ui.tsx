import { SkeletonProps } from 'antd';

import { SkeletonItem } from '../skeleton-item';

type Props = {
  length: number;
} & SkeletonProps;

export const SkeletonList = ({
  length,
  loading,
  children,
  ...props
}: Props) => {
  // Не очень тут хорошо, что создаем массив через Array.from, и потом еще один массив через map...
  // ...но в тестовых целях сойдет.

  if (loading) {
    return Array.from({ length }).map((value, index) => (
      // Здесь индекс позволителен в качестве ключа
      <SkeletonItem {...props} key={index} />
    ));
  }

  return children;
};
