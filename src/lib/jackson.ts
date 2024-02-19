import type {
	IConnectionAPIController,
	IDirectorySyncController,
	IOAuthController,
	ISPSSOConfig,
	JacksonOption,
} from "@boxyhq/saml-jackson";
import jackson from "@boxyhq/saml-jackson";

import { env } from "~/env";

const externalUrl =
	env.NODE_ENV === "production" ? "https://api.gitmoji.academy" : env.AUTH_URL;
const samlAudience = "https://saml.gitmoji.academy";
const samlPath =
	env.NODE_ENV === "production"
		? "/auth/saml/callback"
		: "/api/auth/saml/callback";

const opts: JacksonOption = {
	externalUrl,
	samlAudience,
	samlPath,
	db: {
		engine: "planetscale",
		type: "mysql",
		url: env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	},
	idpEnabled: true, // to allow folks to SSO directly from their IDP
	scimPath: env.NODE_ENV === "production" ? "/scim/v2.0" : "/api/scim/v2.0", // custom SCIM endpoint
	clientSecretVerifier: env.AUTH_SECRET,
};

declare global {
	// biome-ignore lint/style/noVar: <explanation>
	var connectionController: IConnectionAPIController | undefined;
	// biome-ignore lint/style/noVar: <explanation>
	var apiController: IConnectionAPIController | undefined;
	// biome-ignore lint/style/noVar: <explanation>
	var oauthController: IOAuthController | undefined;
	// biome-ignore lint/style/noVar: <explanation>
	var ssoSPConfig: ISPSSOConfig | undefined;
	// biome-ignore lint/style/noVar: <explanation>
	var directorySyncController: IDirectorySyncController | undefined;
}

export default async function init() {
	if (
		!globalThis.connectionController ||
		!globalThis.apiController ||
		!globalThis.oauthController ||
		!globalThis.ssoSPConfig ||
		!globalThis.directorySyncController
	) {
		const ret = await jackson(opts);
		globalThis.connectionController = ret.connectionAPIController;
		globalThis.apiController = ret.connectionAPIController;
		globalThis.oauthController = ret.oauthController;
		globalThis.ssoSPConfig = ret.spConfig;
		globalThis.directorySyncController = ret.directorySyncController;
	}

	return {
		connectionController: globalThis.connectionController,
		apiController: globalThis.apiController,
		oauthController: globalThis.oauthController,
		ssoSPConfig: globalThis.ssoSPConfig,
		directorySyncController: globalThis.directorySyncController,
	};
}
