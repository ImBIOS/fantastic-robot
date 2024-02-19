import Link from "next/link";

import { DiscordIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

import { SigninButton } from "../../app.gitmoji.academy/(auth)/login-bkp/signin-button";

export const HomeActionButton = async () => {
	const session = await auth();

	return (
		<>
			{!session?.user ? (
				<SigninButton
					text="Join Waitlist with Discord"
					icon={<DiscordIcon className="mr-2" />}
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
