import { clsx, type ClassValue } from "clsx";
import { type Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { env } from "~/env";
import { HOME_DOMAIN } from "./constant";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = array.slice(); // Clone the array to avoid modifying the original
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i] as T, shuffled[j] as T] = [shuffled[j] as T, shuffled[i] as T]; // Swap elements
	}
	return shuffled;
}

export function sampleSize<T>(array: T[], n: number): T[] {
	const sample = array.slice();
	const length = sample.length;
	const sampleSize = Math.max(0, Math.min(n, length)); // Ensure sample size is within bounds

	for (let i = 0; i < sampleSize; i++) {
		const randomIndex = i + Math.floor(Math.random() * (length - i));
		[sample[i] as T, sample[randomIndex] as T] = [
			sample[randomIndex] as T,
			sample[i] as T,
		]; // Swap elements
	}

	return sample.slice(0, sampleSize);
}

export function constructMetadata({
	title = `${env.NEXT_PUBLIC_APP_NAME} - DESCRIPTION`,
	description = `${env.NEXT_PUBLIC_APP_NAME} DESCRIPTION.`,
	image = "https://gitmoji.academy/_static/thumbnail.png",
	icons = [
		{
			rel: "apple-touch-icon",
			sizes: "32x32",
			url: "/apple-touch-icon.png",
		},
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
	],
	noIndex = false,
}: {
	title?: string;
	description?: string;
	image?: string;
	icons?: Metadata["icons"];
	noIndex?: boolean;
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			creator: "@dubdotco",
		},
		icons,
		metadataBase: new URL(HOME_DOMAIN),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}

export const getSearchParams = (url: string) => {
	// Create a params object
	const params = {} as Record<string, string>;

	new URL(url).searchParams.forEach((val, key) => {
		params[key] = val;
	});

	return params;
};
