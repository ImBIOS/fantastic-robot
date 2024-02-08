import { ExitIcon } from '@radix-ui/react-icons';

import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { signOut } from '~/server/auth';

const LogoutDropdownItem = () => {
  'use client';
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
      <ExitIcon className="size-6 pr-2" />
      Log Out
    </DropdownMenuItem>
  );
};

export default LogoutDropdownItem;
