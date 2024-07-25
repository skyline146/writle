import { User } from './user';

export type Post = {
  id: string;
  title: string;
  firstParagraph: string;
  author: User;
};
