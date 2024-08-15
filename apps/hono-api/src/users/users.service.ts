import { db } from '@posts-app/database/db';
import { SignUpWithCredentials, UserDatabase, OAuthProvider } from '@posts-app/types';
import { eq, or } from 'drizzle-orm';
import { getHashedPassword } from '../lib/get-hashed-password';
import { UserDataFromOAuthProvider } from '../auth/oauth-providers';
import { users } from '@posts-app/database/schema';
import { PgUpdateSetSource } from 'drizzle-orm/pg-core';
import usersRepository from './users.repository';

const createWithCredentials = async (newUser: SignUpWithCredentials) => {
  const { password } = newUser;
  const hashedPassword = await getHashedPassword(password);

  const id = await usersRepository.create({ ...newUser, password: hashedPassword });

  return id;
};

const createWithOAuth = async (newUser: UserDataFromOAuthProvider, provider: OAuthProvider) => {
  const id = await usersRepository.create({ ...newUser, provider });

  return id;
};

const findOneByUsernameOrEmail = async (value: string): Promise<UserDatabase | null> => {
  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.username, value), eq(users.email, value)));

  return user || null;
};

const updateUserData = async (userId: string, newUserData: PgUpdateSetSource<typeof users>) => {
  await usersRepository.update(userId, newUserData);
};

export default {
  updateUserData,
  createWithCredentials,
  createWithOAuth,
  findOneByUsernameOrEmail
};
