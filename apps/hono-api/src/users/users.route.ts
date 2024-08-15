import { Hono } from 'hono';
import { jwtAuth, responseSerialize } from '../middlewares';
import { UserDatabaseWithoutPasswordSchema, UserProfileSchema } from '@posts-app/zod';
import { UserSettings } from '@posts-app/types';
import { v4 as uuid } from 'uuid';
import { getFileExtension } from '../lib/get-file-extension';
import { uploadToCloudinaryStream } from '@posts-app/cloudinary';
import sharp from 'sharp';
import { getPictureBlurhashUrl } from '../lib/get-picture-blurhash-url';
import usersService from './users.service';
import { httpException } from '../lib/httpException';

type Variables = {
  jwtUser: {
    userId: string;
    sub: string;
  };
};

const usersRoute = new Hono<{ Variables: Variables }>();

usersRoute.get('/', (c) => {
  return c.json({ a: '123' });
});

usersRoute.get(
  '/current',
  jwtAuth,
  responseSerialize(UserDatabaseWithoutPasswordSchema),
  async (c) => {
    const jwtUser = c.get('jwtUser');

    const user = await usersService.findOneByUsernameOrEmail(jwtUser.sub);

    return c.json(user);
  }
);

usersRoute.patch('/current', jwtAuth, async (c) => {
  const body = await c.req.parseBody();
  const { userId } = c.get('jwtUser');

  const newUserData = {} as UserSettings;
  Object.entries(body).map(([key, value]) => {
    newUserData[key as keyof UserSettings] = !value ? null : value;
  });

  if (!newUserData.profilePicture) {
    const { profilePicture, ...rest } = newUserData;

    await usersService.updateUserData(userId, {
      ...rest,
      ...(profilePicture === null && { profilePicture: null, profilePictureBlurhash: null })
    });

    return c.text('Successfully updated!');
  }

  const profilePicture: Blob = newUserData.profilePicture;

  const mediaFileBuffer = Buffer.from(await profilePicture.arrayBuffer());
  const mediaFileFormat = getFileExtension(profilePicture.name);

  let profilePictureBlurhash: string;

  if (mediaFileFormat === '.gif') {
    const jpegBufferFromGif = await sharp(mediaFileBuffer).jpeg().toBuffer();

    profilePictureBlurhash = await getPictureBlurhashUrl(jpegBufferFromGif, 12);
  } else {
    profilePictureBlurhash = await getPictureBlurhashUrl(mediaFileBuffer, 12);
  }

  try {
    const pictureUrl = await uploadToCloudinaryStream(mediaFileBuffer, uuid());

    if (pictureUrl) {
      await usersService.updateUserData(userId, {
        ...newUserData,
        profilePicture: pictureUrl,
        profilePictureBlurhash
      });
    }
  } catch (e) {
    console.log(e);

    return c.text('Failed while uploading media file');
  }

  // Bun.write(`./tmp/${uuid()}${getFileExtension(profilePicture.name)}`, profilePicture);

  return c.text('Successfully updated!');
});

usersRoute.get('/:username', responseSerialize(UserProfileSchema), async (c) => {
  const username = c.req.param('username');

  const user = await usersService.findOneByUsernameOrEmail(username);

  if (!user) {
    throw httpException(c, 404, 'User not found');
  }

  return c.json(user);
});

export { usersRoute };
