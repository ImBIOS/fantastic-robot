'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { type Session } from 'next-auth';

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export const Featurebase = ({ children }: Props) => {
  useEffect(() => {
    const win = window as typeof window & {
      Featurebase: {
        q?: unknown[];
        (
          action: 'identify',
          data: unknown,
          callback: (err?: Error) => void,
        ): void;
      };
    };

    if (typeof win.Featurebase !== 'function') {
      win.Featurebase = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.Featurebase.q = win.Featurebase.q ?? []).push(arguments);
      };
    }
    // TODO: Need paid plan for this to work
    // win.Featurebase(
    //   'identify',
    //   {
    //     // Each 'identify' call should include an "organization" property,
    //     // which is your Featurebase board's name before the ".featurebase.app".
    //     organization: 'heroacademy',

    //     // Required. Replace with your customers data.
    //     email: session.user.email,
    //     name: session.user.name,
    //     id: session.user.id,

    //     // Optional
    //     profilePicture: session.user.image
    //   },
    //   err => {
    //     // Callback function. Called when identify completed.
    //     if (err) {
    //       console.error(err)
    //     } else {
    //       console.log('Data sent successfully!')
    //     }
    //   }
    // )
  }, []);

  return (
    <>
      <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
      {children}
    </>
  );
};
