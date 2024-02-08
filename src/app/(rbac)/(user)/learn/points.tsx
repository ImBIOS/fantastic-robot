'use client';

import { unstable_noStore } from 'next/cache.js';

import { api } from '~/trpc/react';

const Points = () => {
  unstable_noStore();

  const points = api.points.get.useSuspenseQuery();
  return <b>{points[0]?.exp} EXP</b>;
};

export default Points;
