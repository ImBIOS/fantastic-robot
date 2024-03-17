"use client";

import type { OAuthProviderType } from "next-auth/providers";
import { useState } from "react";

import { SpinnerIcon } from "~/components/icons";
import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { signInAction } from "./actions";

type SigninButtonProps = ButtonProps & {
	text?: string;
	provider: OAuthProviderType;
	icon?: React.ReactNode;
};

export function SigninButton({
	text,
	icon,
	provider,
	className,
	...props
}: SigninButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<Button
			onClick={async () => {
				setIsLoading(true);
				// next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
				await signInAction(provider);
			}}
			disabled={isLoading}
			aria-disabled={isLoading}
			className={cn(className)}
			{...props}
		>
			{isLoading ? (
				<SpinnerIcon className="mr-2" />
			) : typeof icon !== "undefined" ? (
				icon
			) : null}
			{text}
		</Button>
	);
}
