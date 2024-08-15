export const ME_BASE = '/me';
export const ME_ROUTES = {
  SETTINGS: ME_BASE + '/settings',
  POSTS: ME_BASE + '/posts',
  FRIENDS: ME_BASE + '/friends',
} as const;

export const AUTH_BASE = '/auth';
export const AUTH_ROUTES = {
  SIGN_IN: AUTH_BASE + '/sign-in',
  SIGN_UP: AUTH_BASE + '/sign-up',
} as const;
