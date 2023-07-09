import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';

// /api/v1/posts, GET
// /api/v1/posts/:id, GET
// /api/v1/posts, POST
// /api/v1/posts/:id, PATCH
// /api/v1/posts/:id, DELETE

// /api/v1/posts/:postId/comments, GET
// /api/v1/posts/:postId/createComment, POST
// /api/v1/posts/:postId/comments/:commentId, PATCH
// /api/v1/posts/:postId/comments/:commentId, DELETE

// Вытащить селекторы в модели, чтобы ограничить область стора
// Разобраться с явными и неявными зависимостями в shared

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
