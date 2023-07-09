import { Button, Result } from 'antd';

export const NotFoundPage = () => {
  // TODO: для ErrorBoundary сделать подобный компонент +-.

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" href='/'>Back Home</Button>}
    />
  );
};
