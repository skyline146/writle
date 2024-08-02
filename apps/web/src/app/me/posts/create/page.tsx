import { SectionTitle } from '@/features/app/me/ui/section-title';
import { Button } from '@/features/shared/ui/button';
import { NavLink } from '@/features/shared/ui/link';

export default function CreatePost() {
  return (
    <>
      <div className='flex items-center gap-10'>
        <SectionTitle title='My Posts' />
        <NavLink href='/me/posts/create'>
          <Button>Create post</Button>
        </NavLink>
      </div>
    </>
  );
}
