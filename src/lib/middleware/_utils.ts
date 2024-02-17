import { type NextRequest } from "next/server";

import { env } from "~/env";

export const parse = (req: NextRequest) => {
	let domain = req.headers.get("host") ?? "";
	domain = domain.replace("www.", ""); // remove www. from domain
	if (domain === "gitmoji.localhost:8888" || domain.endsWith(".vercel.app")) {
		// for local development and preview URLs
		domain = env.NEXT_PUBLIC_APP_SHORT_DOMAIN;
	}

	// path is the path of the URL (e.g. dub.co/stats/github -> /stats/github)
	const path = req.nextUrl.pathname;

	// fullPath is the full URL path (along with search params)
	const searchParams = req.nextUrl.searchParams.toString();
	const fullPath = `${path}${
		searchParams.length > 0 ? `?${searchParams}` : ""
	}`;

	return { domain, path, fullPath };
};

export const getFinalUrl = (url: string, { req }: { req: NextRequest }) => {
	// query is the query string (e.g. dub.sh/github?utm_source=twitter -> ?utm_source=twitter)
	const searchParams = req.nextUrl.searchParams;

	// get the query params of the target url
	const urlObj = new URL(url);

	// if there are no query params, then return the target url as is (no need to parse it)
	if (searchParams.size === 0) return url;

	// if searchParams (type: `URLSearchParams`) has the same key as target url, then overwrite it
	for (const [key, value] of searchParams) {
		urlObj.searchParams.set(key, value);
	}

	// construct final url
	const finalUrl = urlObj.toString();

	return finalUrl;
};

export const detectBot = (req: NextRequest) => {
	const url = req.nextUrl;
	if (url.searchParams.get("bot")) return true;
	const ua = req.headers.get("User-Agent");
	if (ua) {
		/* Note:
		 * - bot is for most bots & crawlers
		 * - ChatGPT is for ChatGPT
		 * - facebookexternalhit is for Facebook crawler
		 * - WhatsApp is for WhatsApp crawler
		 * - MetaInspector is for https://metatags.io/
		 */
		return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
			ua,
		);
	}
	return false;
};
