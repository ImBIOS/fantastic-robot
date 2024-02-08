import { type ForwardRefExoticComponent } from 'react';
import { type Route } from 'next';
import { type IconProps } from '@radix-ui/react-icons/dist/types';

export type NavItem = {
  title: string;
  href: Route;
  icon: ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
};
