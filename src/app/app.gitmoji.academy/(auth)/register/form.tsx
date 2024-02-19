"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { GithubIcon, GoogleIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";

export default function RegisterForm() {
	const searchParams = useSearchParams();
	const next = searchParams?.get("next");
	const [clickedGoogle, setClickedGoogle] = useState(false);
	const [clickedGitub, setClickedGithub] = useState(false);

	return (
		<>
			<Button
				variant="secondary"
				onClick={() => {
					setClickedGoogle(true);
					void signIn("google", {
						...(next && next.length > 0 ? { callbackUrl: next } : {}),
					});
				}}
				loading={clickedGoogle}
				icon={<GoogleIcon className="size-4" />}
			>
				Continue with Google
			</Button>
			<Button
				onClick={() => {
					setClickedGithub(true);
					void signIn("github", {
						...(next && next.length > 0 ? { callbackUrl: next } : {}),
					});
				}}
				loading={clickedGitub}
				icon={<GithubIcon className="size-4" />}
			>
				Continue with GitHub
			</Button>
			<p className="text-center text-sm text-gray-500">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-semibold text-gray-500 transition-colors hover:text-black"
				>
					Sign in
				</Link>
			</p>
		</>
	);
}
