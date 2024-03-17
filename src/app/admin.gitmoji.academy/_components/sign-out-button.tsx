"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

import { SpinnerIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { DropdownMenuShortcut } from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

const SignOutButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="ghost"
			type="submit"
			aria-disabled={pending}
			className={cn("w-full", pending && "cursor-not-allowed opacity-50")}
		>
			{pending ? (
				<SpinnerIcon className="mr-2 size-4" aria-hidden />
			) : (
				<ExitIcon className="mr-2 size-4" aria-hidden />
			)}
			Sign Out
			<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
		</Button>
	);
};

export default SignOutButton;
