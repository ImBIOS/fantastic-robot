'use client';

import { ThemeProvider } from 'next-themes';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { env } from '~/env';
import { TRPCReactProvider } from '~/trpc/react';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });

  return (
    <ThemeProvider enableSystem defaultTheme="system" attribute="class">
      <TRPCReactProvider>
        <PostHogProvider client={posthog}>{children}</PostHogProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
};

export default Providers;
