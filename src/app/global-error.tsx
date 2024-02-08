'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { useSession } from 'next-auth/react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    // Log the error to an error reporting service
    console.log('hi');
    // Set user information, as well as tags and other metadata
    Sentry.setUser(
      session?.user
        ? { ...session.user, email: session.user.email ?? '' }
        : null,
    );
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error, session?.user]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
