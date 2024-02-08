import { Suspense } from 'react';

import { Button } from '~/components/ui/button';

import { HomeActionButton } from './home-action-button';

const Page = () => {
  return (
    <main className="container mx-auto mt-8 flex flex-col items-center justify-center md:max-w-6xl">
      <div className="flex flex-col items-center">
        <div className="m-4 text-7xl font-normal">
          Gitmoji <b>Academy</b>
        </div>
        <div className="text-3xl">
          <p>
            Practice{' '}
            <a
              href="https://gitmoji.dev/"
              className="text-red-500 no-underline"
            >
              gitmoji!
            </a>
          </p>
        </div>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-evenly gap-4">
        {/* <a
          href="https://github.com/ImBIOS/fantastic-robot"
          className="inline-block cursor-pointer rounded-lg bg-yellow-900 px-4 py-3 font-semibold text-white shadow-md hover:translate-y-0.5 hover:shadow-lg hover:shadow-white"
        >
          <span role="img" aria-label="star">
            ⭐️
          </span>{' '}
          Github
        </a> */}
        <a href="https://twitter.com/intent/tweet?text=Gitmoji%20Academy%20%E2%80%93%20platform%20to%20learn%20%23Gitmoji%2C%20an%20%23emoji%20for%20commit%20message%20by%20%40ImBIOS_Dev%20%F0%9F%98%8D%F0%9F%98%9C%20https%3A%2F%2Fgitmoji.academy.">
          <Button variant="outline" className="inline-block">
            <span role="img" aria-label="star">
              X
            </span>{' '}
            Share
          </Button>
        </a>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeActionButton />
        </Suspense>
      </div>
      {/* <div className="flex scale-125 flex-col items-center">
        <div className="mt-5 scale-150">
          <Link href="/en/easy" className="text-2xl font-bold text-red-500">
            Quiz for newbies
          </Link>
        </div>
        <div className="mt-5 scale-150">
          <Link href="/en/hard" className="text-2xl font-bold text-red-500">
            Quiz for gurus
          </Link>
        </div>
      </div> */}
    </main>
  );
};

export default Page;
