import { Suspense } from 'react';
import Link from 'next/link';
import { BoxIcon } from '@radix-ui/react-icons';

import { cn } from '~/lib/utils';
import ThemeSelector from '~/components/theme-selector';

import HeaderActionButton from '../../../../_components/header-action-button';
import MobileSidebar from './mobile-sidebar';

const Header = () => {
  return (
    <section className="fixed inset-x-0 top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/60">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <BoxIcon className="size-6" />
          <h1 className="text-lg font-semibold">T3 app template</h1>
        </Link>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeSelector />

          <Suspense
            fallback={<div className="size-8 animate-pulse rounded-full" />}
          >
            <HeaderActionButton />
          </Suspense>
        </div>
      </nav>
    </section>
  );
};

export default Header;
