import { Suspense } from 'react';
import { type AvatarProps } from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { auth } from '~/server/auth';

const InnerUserAvatar = async (props: AvatarProps) => {
  const session = await auth();
  const user = session?.user;
  return (
    <Avatar {...props}>
      {user?.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <PersonIcon className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export const UserAvatar = (props: AvatarProps) => {
  return (
    <Suspense fallback={<div className="size-6 animate-pulse rounded-full" />}>
      <InnerUserAvatar {...props} />
    </Suspense>
  );
};
