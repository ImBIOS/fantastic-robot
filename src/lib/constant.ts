import { env } from '~/env';

const SHORT_DOMAIN = env.NEXT_PUBLIC_APP_SHORT_DOMAIN ?? 'gitmoji.academy';

export const HOME_DOMAIN = `https://${env.NEXT_PUBLIC_APP_DOMAIN}`;

export const ADMIN_HOSTNAMES = new Set([
  `admin.${env.NEXT_PUBLIC_APP_DOMAIN}`,
  'admin.localhost:8888',
]);

export const API_HOSTNAMES = new Set([
  `api.${env.NEXT_PUBLIC_APP_DOMAIN}`,
  `api.${SHORT_DOMAIN}`,
  'api.localhost:8888',
]);

export const APP_HOSTNAMES = new Set([
  `app.${env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${env.NEXT_PUBLIC_APP_DOMAIN}`,
  'localhost:8888',
  'localhost',
]);
