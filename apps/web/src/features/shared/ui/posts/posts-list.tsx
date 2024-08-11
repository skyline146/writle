import { PostCard } from './post-card';
import { User } from '@posts-app/types';

async function getPosts(): Promise<any> {
  return await new Promise((res) => {
    setTimeout(() => {
      res([
        {
          id: '123',
          title:
            'My first very interesting and unique post My first very interesting and unique post My first very interesting and unique post',
          firstParagraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          author: {
            firstName: 'Arthur',
            lastName: 'Pidrillov',
            username: 'archibald163',
            profilePicture: '/test_profile_picture2.jpg',
          },
        },
        {
          id: '1234',
          title: 'My first very interesting and unique post',
          firstParagraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          author: {
            firstName: 'Steven',
            lastName: 'Hawking',
            username: 'steve1488',
            profilePicture: '/test_profile_picture.jpg',
          },
        },
        {
          id: '1234',
          title: 'My first very interesting and unique post',
          firstParagraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          author: {
            firstName: 'Steven',
            lastName: 'Hawking',
            username: 'steve1488',
            profilePicture: '/test_profile_picture.jpg',
          },
        },
        {
          id: '1234',
          title: 'My first very interesting and unique post',
          firstParagraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          author: {
            firstName: 'Steven',
            lastName: 'Hawking',
            username: 'steve1488',
            profilePicture: '/test_profile_picture.jpg',
          },
        },
      ]);
    }, 1000);
  });
}

interface PostsListProps {
  author?: User;
  withAuthor?: boolean;
}

export const PostsList = async ({ author, withAuthor }: PostsListProps) => {
  const posts: any[] = await getPosts();

  return posts.length > 0 ? (
    posts.map((post) => {
      return (
        <PostCard
          key={post.id}
          postId={post.id}
          author={author ? undefined : post.author}
          title={post.title}
          firstParagraph={post.firstParagraph}
        />
      );
    })
  ) : (
    <p className='text-lg'>You don't have posts</p>
  );
};
