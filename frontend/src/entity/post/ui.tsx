import { FC } from 'react';

import { Card, Divider, Typography } from 'antd';

const { Paragraph, Text } = Typography;

type Props = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  onClick?: () => void;
};

export const PostCard: FC<Props> = ({
  title,
  description,
  createdAt,
  updatedAt,
  onClick,
}) => {
  return (
    <Card title={title} onClick={onClick} hoverable>
      <Paragraph>
        <Text>Описание: </Text>
        <Text>{description}</Text>
      </Paragraph>
      <Divider />
      <Paragraph>
        <Text>Создано: </Text>
        <Text>{new Date(createdAt).toLocaleString()}</Text>
      </Paragraph>
      <Paragraph>
        <Text>Последняя редакция: </Text>
        <Text>{new Date(updatedAt).toLocaleString()}</Text>
      </Paragraph>
    </Card>
  );
};

export const PostContent: FC<Omit<Props, 'title' | 'onClick'>> = ({
  description,
  createdAt,
  updatedAt,
}) => {
  return (
    <Card>
      <Paragraph>
        <Text>Описание: </Text>
        <Text>{description}</Text>
      </Paragraph>
      <Divider />
      <Paragraph>
        <Text>Создано: </Text>
        <Text>{new Date(createdAt).toLocaleString()}</Text>
      </Paragraph>
      <Paragraph>
        <Text>Последняя редакция: </Text>
        <Text>{new Date(updatedAt).toLocaleString()}</Text>
      </Paragraph>
    </Card>
  );
};
