import { Skeleton, SkeletonProps } from 'antd';

export const SkeletonItem = (props: SkeletonProps) => {
  return <Skeleton active {...props} />;
};
