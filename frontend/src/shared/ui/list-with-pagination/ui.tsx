import { FC } from 'react';

import { Pagination, Space } from 'antd';

import { Store } from '../../types';
import { SkeletonList } from '../skeleton-list';

import styles from './styles.module.scss';

type Props = {
  children: JSX.Element[];
  status: Store.Status;
  itemsPerPage: number;
  totalElementsCount: number;
  handleFetchList: (page: number) => void;
};

export const ListWithPagination: FC<Props> = ({
  children,
  status,
  itemsPerPage,
  totalElementsCount,
  handleFetchList,
}) => {
  return (
    <div>
      <Space className={styles.box} direction="vertical">
        <SkeletonList
          length={3}
          loading={status === 'pending'}
          paragraph={{ rows: 6 }}
        >
          <Space className={styles.box} direction="vertical">
            {children}
          </Space>
        </SkeletonList>
      </Space>
      {children.length ? (
        <Pagination
          onChange={handleFetchList}
          pageSize={itemsPerPage}
          total={totalElementsCount}
        />
      ) : null}
    </div>
  );
};
