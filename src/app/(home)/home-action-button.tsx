import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { IconDiscord } from '~/components/icons';
import { SigninButton } from '~/app/(auth)/sign-in/signin-button';
import { auth } from '~/server/auth';

export const HomeActionButton = async () => {
  const session = await auth();

  return (
    <>
      {!session?.user ? (
        <SigninButton
          text="Sign in with Discord"
          icon={IconDiscord}
          provider="discord"
        />
      ) : (
        <Link href="/learn">
          <Button className="inline-block">Start to Learn!</Button>
        </Link>
      )}
    </>
  );
};
