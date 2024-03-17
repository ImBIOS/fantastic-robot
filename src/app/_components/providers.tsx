"use client";

import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { TooltipProvider } from "~/components/ui/tooltip";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

const PostHogProviderWithSession = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { data: session } = useSession();

	const isProd = process.env.NODE_ENV === "production";

	if (isProd) {
		posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
			api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
		});

		if (session) {
			posthog.identify(session.user.id, session.user);
		} else {
			posthog.reset();
		}

		return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
	}

	return children;
};

type Props = {
	children: React.ReactNode;
	session: Session | null;
};

const Providers = ({ children, session }: Props) => {
	return (
		<ThemeProvider
			enableSystem
			//  defaultTheme="system"
			defaultTheme="dark"
			attribute="class"
		>
			<SessionProvider session={session}>
				<TRPCReactProvider>
					<PostHogProviderWithSession>
						<TooltipProvider>{children}</TooltipProvider>
					</PostHogProviderWithSession>
				</TRPCReactProvider>
			</SessionProvider>
		</ThemeProvider>
	);
};

export default Providers;
