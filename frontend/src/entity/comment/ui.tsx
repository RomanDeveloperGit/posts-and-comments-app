import { FC } from 'react';

import { Card, Divider, Typography } from 'antd';

const { Paragraph, Text } = Typography;

type Props = {
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export const CommentCard: FC<Props> = ({
  author,
  content,
  createdAt,
  updatedAt,
}) => {
  return (
    <Card title={author}>
      <Paragraph>
        <Text>{content}</Text>
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
