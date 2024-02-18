import { UserAvatar } from "~/app/admin.gitmoji.academy/dashboard/_components/user-avatar";
import { signOut } from "~/server/auth";

import SignoutButton from "./signout-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ProfileDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserAvatar className="size-8 cursor-pointer" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{/* <DropdownMenuItem className="cursor-pointer">
          <PersonIcon className="size-6 pr-2" />
          Profile
        </DropdownMenuItem> */}
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<SignoutButton />
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
