import { Suspense } from 'react';
import Link from 'next/link';

import { Button } from '~/components/ui/button';

import Points from './points';
import Username from './username';

const DashboardPage = () => {
  return (
    <main>
      <section className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="m-4 text-7xl font-normal">
            Points:{' '}
            <Suspense fallback={<div>Loading...</div>}>
              <Points />
            </Suspense>
          </div>
          <div className="text-3xl">
            <p>
              <Suspense fallback={<div>Loading...</div>}>
                <Username />
              </Suspense>
            </p>
          </div>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-evenly gap-4">
          {/* <Link href="/learn/read"> */}
          <Button disabled className="disabled:hover:cursor-not-allowed">
            Gitmoji Read Practice
          </Button>
          {/* </Link> */}
          <Link href="/learn/write">
            <Button>Gitmoji Write Practice</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
