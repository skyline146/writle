import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCode } from 'hono/utils/http-status';

export const httpException = (c: Context, statusCode: StatusCode, message: string) => {
  return new HTTPException(statusCode, {
    res: c.json({ message })
  });
};
