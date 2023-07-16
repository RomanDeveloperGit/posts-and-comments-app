import React, { FC, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';

type Props = {
  isOpen: boolean;
  setOpen: (status: boolean) => void;
  handleCreate: (title: string, description: string) => Promise<void>;
};

export const CreatePostModal: FC<Props> = ({
  isOpen,
  setOpen,
  handleCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setLoading] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleOk = async () => {
    setLoading(true);

    await handleCreate(title, description);

    setLoading(false);
    setOpen(false);

    clearForm();
  };

  const handleCancel = () => {
    setOpen(false);

    clearForm();
  };

  return (
    <Modal
      title="Создание поста"
      open={isOpen}
      confirmLoading={isLoading}
      okText="Создать"
      cancelText="Назад"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Заголовок"
        value={title}
        onChange={handleChangeTitle}
      />
      <Input
        placeholder="Описание"
        value={description}
        onChange={handleChangeDescription}
      />
    </Modal>
  );
};
