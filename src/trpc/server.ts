import "server-only";

import { loggerLink } from "@trpc/client";
import { experimental_nextCacheLink } from "@trpc/next/app-dir/links/nextCache";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { cookies } from "next/headers";
import { cache } from "react";

import { type AppRouter, appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

import { transformer } from "./shared";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
	return createTRPCContext({
		headers: new Headers({
			cookie: cookies().toString(),
			"x-trpc-source": "rsc",
		}),
	});
});

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === "development" ||
						(op.direction === "down" && op.result instanceof Error),
				}),
				/**
				 * Custom RSC link that lets us invoke procedures without using http requests. Since Server
				 * Components always run on the server, we can just call the procedure as a function.
				 */
				experimental_nextCacheLink({
					transformer,
					// requests are cached for 5 seconds
					revalidate: 5,
					router: appRouter,
					createContext,
				}),
			],
		};
	},
});
