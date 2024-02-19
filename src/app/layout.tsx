import "~/styles/globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { TailwindIndicator } from "~/components/tailwind-indicator";
import { inter } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { auth } from "~/server/auth";

import { Toaster } from "~/components/ui/sonner";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Providers from "./_components/providers";

// // NOTE: Cloudflare Workers only support Edge at the moment
// export const runtime = 'edge'

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "fantastic-robot",
	// TODO: Write description
	description: "TODO: DESCRIPTION_HERE",
	icons: [
		{ rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/favicon-16x16.png",
		},
		{ rel: "icon", url: "/favicon.ico" },
	],
	manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<html lang="en">
			<body
				className={cn(
					"relative min-h-screen bg-gradient-to-bl from-indigo-900/50 via-indigo-950/10 to-indigo-900/5 font-sans antialiased",
					inter.variable,
				)}
			>
				<Providers session={session}>
					<NextTopLoader color="hsl(234 56% 56%)" showSpinner={false} />
					<Header />
					{children}
					<Footer />
					<Toaster closeButton />
					<ReactQueryDevtools initialIsOpen={false} />
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}
