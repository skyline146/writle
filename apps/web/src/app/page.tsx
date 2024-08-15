import { cookies } from 'next/headers';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex h-full flex-col items-center justify-between'>
      <Image
        src={'/test_profile_picture.jpg'}
        // className='object-cover'
        // style={{ overflowClipMargin: 'unset' }}
        alt="User's profile picture"
        width={800}
        height={450}
        // fill
        // sizes='100%'
        placeholder='blur'
        blurDataURL='data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQF/8QAHhAAAgIDAAMBAAAAAAAAAAAAAgMBBAAFESEiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABwRAAICAgMAAAAAAAAAAAAAAAEDAhEAYQQFFP/aAAwDAQACEQMRAD8ARv0F+s8jXYVNoZ9nlPgvzJ26ew45Oxd6yfsxmHqbD7u6QNhzCAVyUD3x3FCGEQdnn3H7YIpbATW8m3qGc8l65CN6z//Z'
      />
      <Image
        src={'/test_profile_picture.jpg'}
        // className='object-cover'
        // style={{ overflowClipMargin: 'unset' }}
        alt="User's profile picture"
        width={800}
        height={450}
        // fill
        // sizes='100%'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAIAAACz0DtzAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDklEQVR4nAEDAfz+AAAAQbyzoP/Lkf+/vbxRTa1DPq5IQLdRT6loRq9XWappa5yDfAAAAEK5tqL/x43/o6KbRknHfFz/uYacQEGqXzmRREWDSk2WZFUAGRdS/9et/9KW2m5uwmtU/96c/72Dsl9btWpB1HxIuXd1gFNnACkpav/AkP+6f7BjYYx2ev+yiv+ofKpCQaxfN7JjNcWNa9uwiQAQKHDakHfqoWvT/v9RVHE5FjfkqIqulpOiXTbkikufS0FDBS4Ad7LRkKmplVI6x///dHSOTSdGxpOFmdjprZFp54U/z3JWn2x2AJbk86bSyqVqSaHf66TO31IzT2uOo5Tb7quVdOGPXPTh7e3z/34Di0M0y6ncAAAAAElFTkSuQmCC'
      />
      <Image
        src={'/test_profile_picture.jpg'}
        // className='object-cover'
        // style={{ overflowClipMargin: 'unset' }}
        alt="User's profile picture"
        width={800}
        height={450}
        // fill
        // sizes='100%'
        placeholder='blur'
        blurDataURL='data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQF/8QAHhAAAgIDAAMBAAAAAAAAAAAAAgMBBAAFESEiMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACA//EABwRAAICAgMAAAAAAAAAAAAAAAEDAhEAYQQFFP/aAAwDAQACEQMRAD8ARv0F+s8jXYVNoZ9nlPgvzJ26ew45Oxd6yfsxmHqbD7u6QNhzCAVyUD3x3FCGEQdnn3H7YIpbATW8m3qGc8l65CN6z//Z'
      />
      {/* TODO: load posts from friends */}
      <div className='z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex'>
        {/* <Link
          href="/posts"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <p className="text-xl font-medium">
            All posts{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </p>
        </Link> */}
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
        <Image
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>

      <div className='mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left'>
        <a
          href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Docs{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-sm opacity-50'>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Learn{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-sm opacity-50'>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Templates{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-sm opacity-50'>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2 className='mb-3 text-2xl font-semibold'>
            Deploy{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </div>
  );
}
