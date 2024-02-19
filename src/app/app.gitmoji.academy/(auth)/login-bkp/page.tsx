import { redirect } from "next/navigation";

import { DiscordIcon, GoogleIcon } from "~/components/icons";
import { auth } from "~/server/auth";

import { SigninButton } from "./signin-button";

export default async function SignInPage() {
	const session = await auth();
	// redirect to home if user is already logged in
	if (session?.user) {
		redirect("/");
	}
	return (
		<section className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-4 py-10">
			<SigninButton
				text="Sign in with Discord"
				icon={<DiscordIcon className="mr-2" />}
				provider="discord"
			/>
			<SigninButton
				text="Sign in with Google"
				icon={<GoogleIcon className="mr-2" />}
				provider="google"
			/>
			{/* <SigninButton
        text="Sign in with SAML SSO"
        provider="boxyhq-saml"
        onClick={async () => {}}
      /> */}
		</section>
	);
}
