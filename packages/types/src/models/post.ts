import { User } from '#models';

export type Post = {
  id: string;
  title: string;
  firstParagraph: string;
  author: User;
};
