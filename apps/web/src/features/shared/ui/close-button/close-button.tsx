import { IconX } from '@tabler/icons-react';

export const DeleteButton = ({ size = 26 }: { size?: number }) => {
  return (
    <button title='Delete'>
      <IconX
        className='cursor-pointer text-neutral-700 hover:text-red-500'
        size={size}
      />
    </button>
  );
};
