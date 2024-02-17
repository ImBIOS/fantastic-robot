"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

const PostHogProviderWithSession = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null;
}) => {
	posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
	});

	if (session) {
		posthog.identify(session.user.id, session.user);
	} else {
		posthog.reset();
	}

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

type Props = {
	children: React.ReactNode;
	session: Session | null;
};

const Providers = ({ children, session }: Props) => {
	posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
	});

	return (
		<ThemeProvider enableSystem defaultTheme="system" attribute="class">
			<SessionProvider session={session}>
				<TRPCReactProvider>
					<PostHogProviderWithSession session={session}>
						{children}
					</PostHogProviderWithSession>
				</TRPCReactProvider>
			</SessionProvider>
		</ThemeProvider>
	);
};

export default Providers;
