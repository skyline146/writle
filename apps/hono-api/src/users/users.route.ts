import { Hono } from 'hono';
import { jwtAuth, responseSerialize } from '../middlewares';
import { usersService } from '.';
import { UserDatabaseWithoutPasswordSchema } from '@posts-app/zod';

type Variables = {
  jwtUser: {
    id: string;
    sub: string;
  };
};

const usersRouter = new Hono<{ Variables: Variables }>();

usersRouter.get('/', (c) => {
  return c.json({ a: '123' });
});

usersRouter.get(
  '/current',
  jwtAuth,
  responseSerialize(UserDatabaseWithoutPasswordSchema),
  async (c) => {
    const jwtUser = c.get('jwtUser');

    const user = await usersService.findOneByUsernameOrEmail(jwtUser.sub);

    return c.json(user);
  }
);

usersRouter.get('/:id', (c) => {
  return c.json({ a: '123' });
});

usersRouter.patch('/:id', jwtAuth, (c) => {
  return c.json({});
});

export { usersRouter };
