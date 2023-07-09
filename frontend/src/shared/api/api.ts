import ky from 'ky';

import { ENV } from '../config';

export const api = ky.create({
  prefixUrl: ENV.VITE_BACKEND_ORIGIN,
});
