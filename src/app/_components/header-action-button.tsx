import { auth, signIn } from "~/server/auth";

import { UserNav } from "../admin.gitmoji.academy/_components/user-nav";
import HeaderLoginButton from "./header-login-button";

const HeaderActionButton = async () => {
	const session = await auth();

	return (
		<>
			{session?.user ? (
				<UserNav user={session.user} />
			) : (
				<form
					action={async () => {
						"use server";
						await signIn("discord", { redirectTo: "/app.gitmoji.academy" });
					}}
				>
					<HeaderLoginButton />
				</form>
			)}
		</>
	);
};

export default HeaderActionButton;
