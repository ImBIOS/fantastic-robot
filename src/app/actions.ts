'use server';

import { api } from '~/trpc/server';

export const incrementExpAction = async (input: number) => {
  await api.points.get.revalidate();
  return await api.points.incrementBy.mutate(input);
};
