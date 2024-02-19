"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GithubIcon, GoogleIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { InfoTooltip } from "~/components/ui/tooltip";
import { env } from "~/env";
import useMediaQuery from "~/lib/hooks/use-media-query";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const next = searchParams?.get("next");
	const [showEmailOption, setShowEmailOption] = useState(false);
	const [showSSOOption, setShowSSOOption] = useState(false);
	const [noSuchAccount, setNoSuchAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [clickedGoogle, setClickedGoogle] = useState(false);
	const [clickedGitub, setClickedGithub] = useState(false);
	const [clickedEmail, setClickedEmail] = useState(false);
	const [clickedSSO, setClickedSSO] = useState(false);

	useEffect(() => {
		const error = searchParams?.get("error");
		error && toast.error(error);
	}, [searchParams]);

	const { isMobile } = useMediaQuery();

	return (
		<>
			<div className="flex space-x-2">
				<Button
					variant="secondary"
					onClick={async () => {
						setClickedGoogle(true);
						await signIn("google", {
							...(next && next.length > 0 ? { callbackUrl: next } : {}),
						});
					}}
					loading={clickedGoogle}
					disabled={clickedEmail || clickedSSO}
					icon={<GoogleIcon className="size-5" />}
				/>
				<Button
					variant="secondary"
					onClick={async () => {
						setClickedGithub(true);
						await signIn("github", {
							...(next && next.length > 0 ? { callbackUrl: next } : {}),
						});
					}}
					loading={clickedGitub}
					disabled={clickedEmail || clickedSSO}
					icon={<GithubIcon className="size-5 text-black" />}
				/>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setClickedEmail(true);
					fetch("/api/auth/account-exists", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email }),
					})
						.then(async (res) => {
							const { exists } = (await res.json()) as {
								exists: boolean;
							};
							if (exists) {
								await signIn("email", {
									email,
									redirect: false,
									...(next && next.length > 0 ? { callbackUrl: next } : {}),
								}).then((res) => {
									setClickedEmail(false);
									if (res?.ok && !res?.error) {
										setEmail("");
										toast.success("Email sent - check your inbox!");
									} else {
										toast.error("Error sending email - try again?");
									}
								});
							} else {
								toast.error("No account found with that email address.");
								setNoSuchAccount(true);
								setClickedEmail(false);
							}
						})
						.catch(() => {
							setClickedEmail(false);
							toast.error("Error sending email - try again?");
						});
				}}
				className="flex flex-col space-y-3"
			>
				{showEmailOption && (
					<div>
						<div className="mb-4 mt-1 border-t border-gray-300" />
						<input
							id="email"
							name="email"
							// biome-ignore lint/a11y/noAutofocus: <explanation>
							autoFocus={!isMobile}
							type="email"
							placeholder="panic@thedis.co"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => {
								setNoSuchAccount(false);
								setEmail(e.target.value);
							}}
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
				)}
				<Button
					variant="secondary"
					{...(!showEmailOption && {
						type: "button",
						onClick: (e) => {
							e.preventDefault();
							setShowSSOOption(false);
							setShowEmailOption(true);
						},
					})}
					loading={clickedEmail}
					disabled={clickedGoogle || clickedSSO}
				>
					Continue with Email
				</Button>
			</form>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setClickedSSO(true);
					await fetch("/api/auth/saml/verify", {
						method: "POST",
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
						body: JSON.stringify({ slug: e.currentTarget.slug.value }),
					}).then(async (res) => {
						const { data, error } = (await res.json()) as {
							data?: { projectId: string };
							error?: string;
						};
						if (error) {
							toast.error(error);
							setClickedSSO(false);
							return;
						}
						await signIn("saml", undefined, {
							tenant: data?.projectId,
							product: "Dub",
						});
					});
				}}
				className="flex flex-col space-y-3"
			>
				{showSSOOption && (
					<div>
						<div className="mb-4 mt-1 border-t border-gray-300" />
						<div className="flex items-center space-x-2">
							<h2 className="text-sm font-medium text-gray-900">
								Project Slug
							</h2>
							<InfoTooltip
								content={`This is your project's unique identifier on ${env.NEXT_PUBLIC_APP_NAME}. E.g. app.dub.co/acme is "acme".`}
							/>
						</div>
						<input
							id="slug"
							name="slug"
							// biome-ignore lint/a11y/noAutofocus: <explanation>
							autoFocus={!isMobile}
							type="text"
							placeholder="my-team"
							autoComplete="off"
							required
							className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
						/>
					</div>
				)}
				<Button
					variant="secondary"
					{...(!showSSOOption && {
						type: "button",
						onClick: (e) => {
							e.preventDefault();
							setShowEmailOption(false);
							setShowSSOOption(true);
						},
					})}
					loading={clickedSSO}
					disabled={clickedGoogle || clickedEmail}
				>
					Continue with SAML SSO
				</Button>
			</form>
			{noSuchAccount ? (
				<p className="text-center text-sm text-red-500">
					No such account.{" "}
					<Link href="/register" className="font-semibold text-red-600">
						Sign up
					</Link>{" "}
					instead?
				</p>
			) : (
				<p className="text-center text-sm text-gray-500">
					Don&apos;t have an account?{" "}
					<Link
						href="/register"
						className="font-semibold text-gray-500 transition-colors hover:text-black"
					>
						Sign up
					</Link>
				</p>
			)}
		</>
	);
}
