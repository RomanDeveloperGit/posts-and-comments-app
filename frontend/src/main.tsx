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

// Позаменять все дивы на соответствующие элементы в ANTD

// При пагинации откручивать страницу в начало

// Каждую модель реэкспортить в model/index.ts - слайсы, асинхронные санки и т.д.

// CRUD API's ложить на уровне entity. Стор постов положить на уровень entity?
// Стор детальной инфы о посте с комментами оставить в пейдже
// Comment -> PostComment переименовать...
// ... Либо делать на каждом слое группировку: post/post, post/comment

// *Мб данные затаскивать в прилу на этапе инициализации для улучшения UX и избавления от сайд эффекта в компоненте?

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
