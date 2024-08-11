import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface LinkProps {
  href: string;
  className?: string;
  active?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  withArrow?: boolean;
}

export const NavLink = ({
  href,
  className = '',
  children,
  icon,
  withArrow,
  active,
}: LinkProps) => {
  return (
    <Link href={href} className='h-full'>
      <div
        className={twMerge(
          'group/link flex w-full gap-2 text-neutral-400 hover:text-white',
          className,
          active && 'text-white',
        )}
      >
        {icon}
        {children}
        {withArrow && (
          <span className='inline-block transition-transform group-hover/link:translate-x-1 motion-reduce:transform-none'>
            -&gt;
          </span>
        )}
      </div>
    </Link>
  );
};
