import { User } from '@posts-app/types';
import { FriendCard } from '.';

const data = [
  {
    firstName: 'Alex',
    lastName: 'Fergusson',
    username: 'alex322_',
    profilePicture: null,
  },
  {
    firstName: 'Steven',
    lastName: 'Hawking',
    username: 'steve1488',
    profilePicture: '/test_profile_picture2.jpg',
  },
];

async function getFriends(search?: string): Promise<User[]> {
  return await new Promise((res) => {
    setTimeout(() => {
      let results = data;
      if (search) {
        results = data.filter((user) => user.username.startsWith(search));
      }

      res(results as User[]);
    }, 500);
  });
}

export const FriendsList = async ({ search }: { search?: string }) => {
  const friends = await getFriends(search);

  if (!friends.length) {
    if (search) {
      return <p className='text-lg'>Not found</p>;
    }

    return <p className='text-lg'>Add someone to your friends list</p>;
  }

  return friends.map((friend) => {
    return <FriendCard key={friend.username} friend={friend} />;
  });
};
