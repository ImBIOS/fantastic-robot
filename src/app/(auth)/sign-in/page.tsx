import { redirect } from 'next/navigation';

import { IconDiscord, IconGoogle } from '~/components/icons';
import { SigninButton } from '~/app/(auth)/sign-in/signin-button';
import { auth } from '~/server/auth';

export default async function SignInPage() {
  const session = await auth();
  // redirect to home if user is already logged in
  if (!!session?.user) {
    redirect('/');
  }
  return (
    <section className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-4 py-10">
      <SigninButton
        text="Sign in with Discord"
        icon={IconDiscord}
        provider="discord"
      />
      <SigninButton
        text="Sign in with Google"
        icon={IconGoogle}
        provider="google"
      />
      {/* <SigninButton
        text="Sign in with SAML SSO"
        provider="boxyhq-saml"
        onClick={async () => {}}
      /> */}
    </section>
  );
}
