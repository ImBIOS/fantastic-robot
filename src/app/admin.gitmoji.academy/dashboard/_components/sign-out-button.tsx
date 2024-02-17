"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

import { IconSpinner } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const SignOutButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="destructive"
			type="submit"
			aria-disabled={pending}
			className={cn("w-full", pending && "cursor-not-allowed opacity-50")}
		>
			{pending ? (
				<IconSpinner className="mr-2 size-4" aria-hidden />
			) : (
				<ExitIcon className="mr-2 size-4" aria-hidden />
			)}
			Sign Out
		</Button>
	);
};

export default SignOutButton;
