import { db } from '@posts-app/database/db';
import { SignUpWithCredentials, UserDatabase, OAuthProvider, UserSettings } from '@posts-app/types';
import { eq, or } from 'drizzle-orm';
import { getHashedPassword } from '../lib/get-hashed-password';
import { UserDataFromOAuthProvider } from '../auth/oauth-providers';
import { users } from '@posts-app/database/schema';
import { PgUpdateSetSource } from 'drizzle-orm/pg-core';

export const createWithCredentials = async (newUser: SignUpWithCredentials) => {
  const { username, password, firstName, lastName } = newUser;
  const hashedPassword = await getHashedPassword(password as string);

  const [{ id }] = await db
    .insert(users)
    .values({ username, firstName, lastName, password: hashedPassword })
    .returning({
      id: users.id
    });

  return id;
};

export const createWithOAuth = async (
  newUser: UserDataFromOAuthProvider,
  provider: OAuthProvider
) => {
  const { username, firstName, lastName, profilePicture, email } = newUser;

  const [{ id }] = await db
    .insert(users)
    .values({ username, firstName, lastName, email, profilePicture, provider })
    .returning({
      id: users.id
    });

  return id;
};

export const findOneByUsernameOrEmail = async (value: string): Promise<UserDatabase | null> => {
  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.username, value), eq(users.email, value)));

  return user || null;
};

export const update = async (id: string, newUserData: PgUpdateSetSource<typeof users>) => {
  await db.update(users).set(newUserData).where(eq(users.id, id));
};
