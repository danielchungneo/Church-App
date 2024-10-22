import {
  buildUrl,
  generateCrudRoutes,
  IBuildUrlOptions,
  METHOD,
} from '@/utils/api';

const session = {
  get: () => {
    return {
      url: '/auth/session/me',
      method: METHOD.POST,
    };
  },
  login: () => {
    return {
      url: '/auth/session/login',
      method: METHOD.POST,
    };
  },
};

const users = {
  ...generateCrudRoutes('auth/users'),
}

const api = {
  session,
  users,
};

export default api;