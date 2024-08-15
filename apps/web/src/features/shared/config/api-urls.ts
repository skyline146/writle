export const BASE_API_URL = process.env.API_URL || 'http://localhost:4000/api';

export const BASE_AUTH_URL = BASE_API_URL + '/auth';
export const BASE_USERS_URL = BASE_API_URL + '/users';

export const API_URLS = {
  AUTH: {
    OAUTH: BASE_AUTH_URL + '/oauth2',
    SIGN_IN: BASE_AUTH_URL + '/sign-in',
    SIGN_UP: BASE_AUTH_URL + '/sign-up',
    SIGN_OUT: BASE_AUTH_URL + '/sign-out',
    REFRESH_SESSION: BASE_AUTH_URL + '/refresh',
  },
  USERS: {
    CURRENT: BASE_USERS_URL + '/current',
  },
} as const;
