'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDelayedValue } from '@/features/shared/lib/use-delayed-value';
import { Input } from '@/features/shared/ui/input';

interface SearchInputProps {
  searchParams: {
    searchText?: string;
  };
}

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState<string | undefined>(
    searchParams.get('searchText') || undefined,
  );
  const searchValue = useDelayedValue(value, 300);

  useEffect(() => {
    const searchQuery = new URLSearchParams(searchParams);

    if (searchQuery.get('searchText') === searchValue) return;

    if (!searchValue) {
      searchQuery.delete('searchText');
    } else {
      searchQuery.set('searchText', searchValue as string);
    }

    router.replace(`?${searchQuery.toString()}`);
  }, [searchValue]);

  return (
    <Input
      placeholder='Search'
      className='w-full xs:w-auto'
      type='search'
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
