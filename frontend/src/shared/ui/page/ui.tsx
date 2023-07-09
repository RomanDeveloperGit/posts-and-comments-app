import { FC, ReactNode } from 'react';

import { Layout } from 'antd';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

export const Page: FC<Props> = ({ children }) => {
  return <Layout className={styles.page}>{children}</Layout>;
};
