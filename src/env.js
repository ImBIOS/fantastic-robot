import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		DATABASE_URL: z
			.string()
			.url()
			.startsWith("mysql://")
			.endsWith('?ssl={"rejectUnauthorized":true}')
			.refine(
				(str) => !str.includes("YOUR_MYSQL_URL_HERE"),
				"You forgot to change the default URL",
			),
		OPENAI_API_KEY: z.string().startsWith("sk-"),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		AUTH_SECRET:
			process.env.NODE_ENV === "production"
				? z.string()
				: z.string().optional(),
		AUTH_URL: z.preprocess(
			// This makes Vercel deployments not fail if you don't set AUTH_URL
			// Since NextAuth.js automatically uses the VERCEL_URL if present.
			(str) => process.env.VERCEL_URL ?? str,
			// VERCEL_URL doesn't include `https` so it cant be validated as a URL
			process.env.VERCEL ? z.string() : z.string().url(),
		),
		// Add ` on ID and SECRET if you want to make sure they're not empty
		AUTH_DISCORD_ID: z.string(),
		AUTH_DISCORD_SECRET: z.string(),
		// AUTH_GOOGLE_ID: z.string().endsWith('.apps.googleusercontent.com'),
		// AUTH_GOOGLE_SECRET: z.string().startsWith('GOCSPX-'),
		// BOXYHQ_SAML_JACKSON_URL: z.string().url(),
		// BOXYHQ_PRODUCT_ID: z.string().startsWith('boxy_prd_'),
		UPSTASH_REDIS_REST_URL: z
			.string()
			.url()
			.startsWith("https://")
			.endsWith(".upstash.io"),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
		MIDTRANS_SERVER_KEY: z.string().refine((val) => {
			const isProduction = process.env.VERCEL_ENV === "production";
			const prefix = isProduction ? "Mid-server-" : "SB-Mid-server-";
			return val.startsWith(prefix);
		}, "MIDTRANS_SERVER_KEY must start with the appropriate prefix depending on the production status"),
		MIDTRANS_CLIENT_KEY: z.string().refine((val) => {
			const isProduction = process.env.VERCEL_ENV === "production";
			const prefix = isProduction ? "Mid-" : "SB-Mid-";
			return val.startsWith(prefix);
		}, "MIDTRANS_CLIENT_KEY must start with the appropriate prefix depending on the production status"),
		RESEND_API_KEY: z.string().startsWith("re_"),
		SENTRY_AUTH_TOKEN: z.string().startsWith("sntrys_"),
		SENTRY_PROJECT: z.string(),
		ADMIN_EMAILS: z
			.string()
			.transform((val) => val.split(","))
			.pipe(z.array(z.string().email())),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_POSTHOG_KEY: z.string().startsWith("phc_"),
		NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
		NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
		NEXT_PUBLIC_SENTRY_ORG: z.string(),
		NEXT_PUBLIC_APP_DOMAIN: z.string(),
		NEXT_PUBLIC_APP_NAME: z.string(),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		NODE_ENV: process.env.NODE_ENV,
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
		AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
		// AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		// AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
		// BOXYHQ_SAML_JACKSON_URL: process.env.BOXYHQ_SAML_JACKSON_URL,
		// BOXYHQ_PRODUCT_ID: process.env.BOXYHQ_PRODUCT_ID,
		AUTH_URL: process.env.AUTH_URL,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
		MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
		NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
		NEXT_PUBLIC_SENTRY_ORG: process.env.NEXT_PUBLIC_SENTRY_ORG,
		SENTRY_PROJECT: process.env.SENTRY_PROJECT,
		// LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
		// LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
		// LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
		ADMIN_EMAILS: process.env.ADMIN_EMAILS,
		NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
		NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined.
	 * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
