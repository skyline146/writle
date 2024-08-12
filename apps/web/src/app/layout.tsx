import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { Header } from '@/features/app/shared/ui/header';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Writle',
  description:
    'Web application for publishing posts/articles, adding friends, viewing posts by other people based on your interests.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={twMerge(inter.className, 'flex h-screen flex-col')}>
        <Header />
        <main className='flex-grow px-3 pb-[20px] pt-[140px] sm:px-8 sm:pt-[90px]'>
          {children}
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
