"use server";

import { type OAuthProviderType } from "next-auth/providers";

import { signIn } from "~/server/auth";

export const signInAction = async (provider: OAuthProviderType) => {
	await signIn(provider, { callbackUrl: "/" });
};
