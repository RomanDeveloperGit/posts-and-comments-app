import { postListSlice } from '../../widgets/post-list';
import { postDetailsSlice } from '../../pages/post-details';

// Или всё-таки держать сторы на уровне сущностей в подавляющем большинстве, ...
// ...иногда выходить выше по необходимости.
// Структура тогда была бы следующая( возможно, comments бы закинул в current, либо так оставил бы ):
// Store {
//   post {
//     list {
//       data
//       status
//       error
//     }
//     current {

//     }
//     comments
//   }
// }

export const rootReducer = {
  postList: postListSlice.reducer,
  postDetails: postDetailsSlice.reducer,
};
