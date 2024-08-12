import { sessions } from '@posts-app/database/schema';

export type CustomCookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  path: string;
  sameSite: 'strict' | 'lax' | 'none';
  expires: number;
};

export type SessionCookies = {
  accessToken: {
    value: string;
    options: CustomCookieOptions;
  };
  sessionId: string;
};

export type JwtPayload = {
  sub: string;
  userId: string;
  exp: number;
};

export type Session = typeof sessions.$inferSelect;
