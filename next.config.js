import { withSentryConfig } from "@sentry/nextjs";

import { env } from "./src/env.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	// experimental: {
	// 	// ppr: true,
	// 	// typedRoutes: true,
	// 	nextScriptWorkers: true,
	// 	// useDeploymentId: true,
	// 	// useDeploymentIdServerActions: true,
	// },
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

const config = withSentryConfig(
	nextConfig,
	{
		// For all available options, see:
		// https://github.com/getsentry/sentry-webpack-plugin#options

		// Suppresses source map uploading logs during build
		silent: true,
		org: env.NEXT_PUBLIC_SENTRY_ORG,
		project: env.SENTRY_PROJECT,
	},
	{
		// For all available options, see:
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Transpiles SDK to be compatible with IE11 (increases bundle size)
		transpileClientSDK: false,

		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
		tunnelRoute: "/monitoring",

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true,

		// Enables automatic instrumentation of Vercel Cron Monitors.
		// See the following for more information:
		// https://docs.sentry.io/product/crons/
		// https://vercel.com/docs/cron-jobs
		automaticVercelMonitors: true,
	},
);

export default config;
