import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { HOME_DOMAIN } from "~/lib/constant";

export default function sitemap(): MetadataRoute.Sitemap {
	const headersList = headers();
	let domain = headersList.get("host");

	if (domain === "dub.localhost:8888" || domain?.endsWith(".vercel.app")) {
		// for local development and preview URLs
		domain = HOME_DOMAIN;
	}

	return [
		{
			url: `https://${domain}`,
			lastModified: new Date(),
		},
	];
}
