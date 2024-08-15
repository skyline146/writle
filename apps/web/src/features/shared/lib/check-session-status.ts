import { JwtPayload } from '@posts-app/types';
import { parseJwt } from './parse-jwt';

interface SessionTokens {
  accessToken?: string;
  sessionId?: string;
}

type SessionStatus = 'expired' | 'none' | 'active';

export const checkSessionStatus = ({
  accessToken,
  sessionId,
}: SessionTokens): SessionStatus => {
  //check accessToken on exist or expired
  if (!accessToken) {
    //check if no session cookies are presented
    if (!sessionId) {
      return 'none';
    } else {
      return 'expired';
    }
  } else {
    const jwtPayload: JwtPayload = parseJwt(accessToken);

    //check if accessToken expires in less than 20 seconds
    if (jwtPayload.exp - Math.floor(Date.now() / 1000) < 20) {
      return 'expired';
    }
  }

  return 'active';
};
