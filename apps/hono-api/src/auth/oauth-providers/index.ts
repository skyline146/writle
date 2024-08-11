import { OAuthProvider } from '@posts-app/types';

import * as googleProvider from './google';

export type UserDataFromOAuthProvider = {
  username?: string;
  email?: string;
  firstName: string;
  lastName?: string;
  profilePicture: string | null;
};

type Provider = {
  getAuthorizationUrl: () => string;
  getAccessToken: (code: string) => Promise<string>;
  getUserData: (access_token: string) => Promise<UserDataFromOAuthProvider>;
};

const providers = {
  google: googleProvider
} as Record<OAuthProvider, Provider>;

const getProvider = (providerName: OAuthProvider) => {
  return providers[providerName];
};

export default getProvider;
