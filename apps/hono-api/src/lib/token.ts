import { sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import { jwtSecretKey } from '../config';

export const signJwt = async (payload: JWTPayload) => {
  return await sign(payload, jwtSecretKey);
};

export const verifyJwt = async (token: string) => {
  return (await verify(token, jwtSecretKey)) as JWTPayload & { userId: string; sub: string };
};

export const getRegisteredClaims = (durationSeconds: number) => {
  const currentSeconds = Math.floor(Date.now() / 1000);
  return {
    iat: currentSeconds,
    exp: currentSeconds + durationSeconds,
    nbf: currentSeconds - 60 * 2
  };
};
