import jackson, {
	type IOAuthController,
	type JacksonOption,
} from "@boxyhq/saml-jackson";

import { env } from "~/env";

const samlAudience = "https://saml.boxyhq.com";
const samlPath = "/api/oauth/saml";

const opts: JacksonOption = {
	externalUrl: env.AUTH_URL,
	samlAudience,
	samlPath,
	db: {
		engine: "planetscale",
		type: "mysql",
		url: env.DATABASE_URL,
	},
};

let oauthController: IOAuthController;

declare const global: {
	oauthController?: IOAuthController;
};

const g = global;

export default async function init() {
	if (!g.oauthController) {
		const ret = await jackson(opts);

		oauthController = ret.oauthController;
		g.oauthController = oauthController;
	} else {
		oauthController = g.oauthController;
	}

	return {
		oauthController,
	};
}
