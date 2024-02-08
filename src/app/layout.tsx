import '~/styles/globals.css';

import { type Metadata } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import { inter } from '~/lib/fonts';
import { cn } from '~/lib/utils';
import { TailwindIndicator } from '~/components/tailwind-indicator';
import { auth } from '~/server/auth';

import Header from './_components/header';
import Providers from './_components/providers';

// // NOTE: Cloudflare Workers only support Edge at the moment
// export const runtime = 'edge'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'fantastic-robot',
  description:
    'Place to learn, practice, compete... and be a hero! in any field.',
  icons: [
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    { rel: 'icon', url: '/favicon.ico' },
  ],
  manifest: '/manifest.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={cn(
          'relative min-h-screen bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        <Providers session={session}>
          <NextTopLoader color="#df4224" showSpinner={false} />
          <Header />
          {children}
          <Toaster position="bottom-center" />
          <ReactQueryDevtools initialIsOpen={false} />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
