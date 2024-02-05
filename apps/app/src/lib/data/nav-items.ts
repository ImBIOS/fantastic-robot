import { DashboardIcon } from '@radix-ui/react-icons'

import { type NavItem } from '~/lib/types'

export const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    href: '/',
    color: 'text-sky-500'
  }
  // {
  //   title: 'Example',
  //   icon: BookmarkIcon,
  //   href: '/example',
  //   color: 'text-orange-500',
  //   isChidren: true,
  //   children: [
  //     {
  //       title: 'Example-01',
  //       icon: BookmarkIcon,
  //       color: 'text-red-500',
  //       href: '/example/employees'
  //     },
  //     {
  //       title: 'Example-02',
  //       icon: BookmarkIcon,
  //       color: 'text-red-500',
  //       href: '/example/example-02'
  //     },
  //     {
  //       title: 'Example-03',
  //       icon: BookmarkIcon,
  //       color: 'text-red-500',
  //       href: '/example/example-03'
  //     }
  //   ]
  // }
]
