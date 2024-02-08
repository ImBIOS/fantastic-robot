'use client';

import { useState, type SVGProps } from 'react';
import { type OAuthProviderType } from 'next-auth/providers';

import { cn } from '~/lib/utils';
import { Button, type ButtonProps } from '~/components/ui/button';

import { IconSpinner } from '../../../components/icons';
import { signInAction } from './actions';

type SigninButtonProps = ButtonProps & {
  text?: string;
  provider: OAuthProviderType;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function SigninButton({
  text,
  icon,
  provider,
  className,
  ...props
}: SigninButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const Icon = icon;
  return (
    <Button
      variant="outline"
      onClick={async () => {
        setIsLoading(true);
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        await signInAction(provider);
      }}
      disabled={isLoading}
      aria-disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2" />
      ) : typeof Icon !== 'undefined' ? (
        <Icon className="mr-2" />
      ) : null}
      {text}
    </Button>
  );
}
