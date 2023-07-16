import { FC, useState } from 'react';
import { Button } from 'antd';

import { CreatePostModal } from './modal';

type Props = {
  handleCreate: (title: string, description: string) => Promise<void>;
};

export const CreatePost: FC<Props> = ({ handleCreate }) => {
  const [isOpen, setOpen] = useState(false);

  const showModal = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Создать пост
      </Button>
      <CreatePostModal
        isOpen={isOpen}
        setOpen={setOpen}
        handleCreate={handleCreate}
      />
    </>
  );
};
