import { Hono } from 'hono';
import { jwtAuth, responseSerialize } from '../middlewares';
import { usersService } from '.';
import { UserDatabaseWithoutPasswordSchema } from '@posts-app/zod';
import { UserSettings } from '@posts-app/types';
import { v4 as uuid } from 'uuid';
import { getFileExtension } from '../lib/get-file-extension';
import { uploadToCloudinaryStream } from '@posts-app/cloudinary';
import sharp from 'sharp';
import { getPlaiceholder } from 'plaiceholder';

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

    profilePictureBlurhash = (await getPlaiceholder(jpegBufferFromGif, { size: 12 })).base64;
  } else {
    profilePictureBlurhash = (await getPlaiceholder(mediaFileBuffer, { size: 12 })).base64;
  }

  try {
    const pictureUrl = await uploadToCloudinaryStream(mediaFileBuffer, uuid());

    if (pictureUrl) {
      await usersService.update(userId, {
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

usersRouter.get('/:id', (c) => {
  return c.json({ a: '123' });
});

export { usersRouter };
