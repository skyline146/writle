import { db } from '@posts-app/database/db';
import { users } from '@posts-app/database/schema';
import { InsertUser, UserDatabase } from '@posts-app/types';
import { eq, SQL } from 'drizzle-orm';
import { PgUpdateSetSource, SelectedFields } from 'drizzle-orm/pg-core';

const create = async (newUser: InsertUser) => {
  const [{ id }] = await db.insert(users).values(newUser).returning({
    id: users.id
  });

  return id;
};

const update = async (id: string, newUserData: PgUpdateSetSource<typeof users>) => {
  await db.update(users).set(newUserData).where(eq(users.id, id));
};

// type GetUser<T extends SelectedFields | undefined> = {
//   fields?: T;
//   where?: SQL;
// };

// type RequiredField<T, RF extends keyof T> = T & Required<Pick<T, RF>>;

// function get<T extends SelectedFields>(
//   params: RequiredField<GetUser<T>, 'fields'>
// ): Promise<{ [K in keyof T]: K extends keyof UserDatabase ? UserDatabase[K] : never }[]>;
// function get<T extends undefined>(params: Omit<GetUser<T>, 'fields'>): Promise<UserDatabase[]>;

// async function get<T extends SelectedFields>({ fields, where }: GetUser<T>) {
//   const result = fields
//     ? await db.select(fields).from(users).where(where)
//     : await db.select().from(users).where(where);

//   return result;
// }

// type GetUser<T extends SelectedFields | undefined> = {
//   fields?: T;
//   where?: SQL;
// };

// type ReturnedType<T> = T extends SelectedFields
//   ? { [K in keyof T]: K extends keyof UserDatabase ? UserDatabase[K] : never }[]
//   : UserDatabase[];

// async function get<T extends SelectedFields | undefined>(
//   options: GetUser<T>
// ): Promise<ReturnedType<T>> {
//   const { fields, where } = options;

//   const result = fields
//     ? await db.select(fields).from(users).where(where)
//     : await db.select().from(users).where(where);

//   return result;
// }

export default {
  create,
  update
};
