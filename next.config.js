/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
    ppr: true,
    nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'avatars.githubusercontent.com',
      //   port: '',
      //   pathname: '**'
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.discordapp.com',
      //   port: '',
      //   pathname: '**'
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'avatar.vercel.sh',
      //   port: '',
      //   pathname: '**'
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'lh3.googleusercontent.com',
      //   port: '',
      //   pathname: '/a/**'
      // }
    ],
  },
};

export default config;
