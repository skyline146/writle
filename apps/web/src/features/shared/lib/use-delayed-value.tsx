'use client';

import { useEffect, useState } from 'react';

export const useDelayedValue = (value: unknown, ms: number) => {
  const [delayedValue, setDelayedValue] = useState<typeof value>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedValue(value);
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return delayedValue;
};
