import { Provider } from 'react-redux';

import { Router } from './router';
import { store } from './store';

import 'antd/dist/reset.css';
import './styles.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
