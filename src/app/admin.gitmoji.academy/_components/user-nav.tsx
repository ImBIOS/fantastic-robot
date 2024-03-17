import type { User } from "next-auth";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signOut } from "~/server/auth";

import Link from "next/link";
import SignOutButton from "./sign-out-button";
import { UserAvatar } from "./user-avatar";

type Props = {
	user: Pick<User, "name" | "email">;
};

export function UserNav({ user: { name, email } }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar className="size-8 cursor-pointer" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex items-center justify-start gap-4 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{name && <p className="font-medium">{name}</p>}
						{email && (
							<p className="w-[200px] truncate text-sm text-foreground/80">
								{email}
							</p>
						)}
					</div>
				</div>
				<Link href="/app.gitmoji.academy">
					<DropdownMenuItem>Dashboard</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<SignOutButton />
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
