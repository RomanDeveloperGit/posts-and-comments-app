import { ListMeta } from './responses';

export type Status = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export interface ServerItemState<T> {
  data: T;
  status: Status;
  error: string | null;
}

export interface ServerListState<T> extends ServerItemState<T[]> {
  meta: ListMeta;
}

export type PaginationPayload = {
  page: number;
  limit: number;
};
