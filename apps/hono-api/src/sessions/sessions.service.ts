import { db } from '@posts-app/database/db';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { cookiePeriods, getCookieOptions } from '../lib/get-cookie-options';
import { signJwt, getRegisteredClaims } from '../lib/token';
import { SessionCookies } from '@posts-app/types';
import { sessions } from '@posts-app/database/schema';

export type SessionPayload = {
  userId: string;
  sub: string;
};

export const create = async (sessionPayload: SessionPayload): Promise<SessionCookies> => {
  const [accessTokenOptions, refreshTokenOptions] = [
    getCookieOptions('access_token'),
    getCookieOptions('refresh_token')
  ];

  const [accessToken, refreshToken] = await Promise.all([
    signJwt({
      sub: sessionPayload.sub,
      userId: sessionPayload.userId,
      ...getRegisteredClaims(cookiePeriods['access_token'])
    }),
    signJwt({
      sub: sessionPayload.sub,
      userId: sessionPayload.userId,
      ...getRegisteredClaims(cookiePeriods['refresh_token'])
    })
  ]);

  const sessionId = uuid();

  await db.insert(sessions).values({
    id: sessionId,
    userId: sessionPayload.userId,
    refreshToken,
    expiresIn: refreshTokenOptions.expires
  });

  const response = {
    accessToken: {
      value: accessToken,
      options: accessTokenOptions
    },
    sessionId
  };

  return response;
};

export const getById = async (sessionId: string) => {
  const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId));

  return session || null;
};

export const remove = async (sessionId: string) => {
  const [deletedSession] = await db.delete(sessions).where(eq(sessions.id, sessionId)).returning();

  return deletedSession;
};
