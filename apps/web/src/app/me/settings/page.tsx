import { SectionTitle } from '@/features/app/me/ui/section-title';
import { Suspense } from 'react';
import { UserDataForm } from '@/features/app/me/settings/ui/user-data-form';

export default async function Settings() {
  return (
    <>
      <SectionTitle title='Settings' />
      <Suspense fallback={'Loading...'}>
        <UserDataForm />
      </Suspense>
    </>
  );
}
