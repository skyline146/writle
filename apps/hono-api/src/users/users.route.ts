import { Hono } from 'hono';
import { jwtAuth, responseSerialize } from '../middlewares';
import { usersService } from '.';
import { UserDatabaseWithoutPasswordSchema } from '@posts-app/zod';
import { UserSettings } from '@posts-app/types';
import { v4 as uuid } from 'uuid';
import { getFileExtension } from '../lib/get-file-extension';

type Variables = {
  jwtUser: {
    userId: string;
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

usersRouter.patch('/current', jwtAuth, async (c) => {
  const body = await c.req.parseBody();
  const { userId } = c.get('jwtUser');

  const newUserData = {} as UserSettings;
  Object.entries(body).map(([key, value]) => {
    newUserData[key as keyof UserSettings] = !value ? null : value;
  });

  if (!newUserData.profilePicture) {
    const { profilePicture, ...rest } = newUserData;

    await usersService.update(userId, {
      ...rest,
      ...(profilePicture === null && { profilePicture: null })
    });

    return c.text('Successfully updated!');
  }

  const profilePicture: Blob = newUserData.profilePicture;

  Bun.write(`./tmp/${uuid()}${getFileExtension(profilePicture.name)}`, profilePicture);

  return c.json({});
});

usersRouter.get('/:id', (c) => {
  return c.json({ a: '123' });
});

export { usersRouter };
