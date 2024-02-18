import Link from "next/link";

import { DiscordIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

import { SigninButton } from "../app.gitmoji.academy/(auth)/login/signin-button";

export const HomeActionButton = async () => {
	const session = await auth();

	return (
		<>
			{!session?.user ? (
				<SigninButton
					text="Sign in with Discord"
					icon={DiscordIcon}
					provider="discord"
				/>
			) : (
				<Link href="/">
					<Button className="inline-block">Start to Learn!</Button>
				</Link>
			)}
		</>
	);
};
