"use client";

import { useFormStatus } from "react-dom";
import { SpinnerIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";

const HeaderLoginButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button disabled={pending} aria-disabled={pending} size="sm" type="submit">
			{pending ? <SpinnerIcon className="animate-spin" /> : "Sign In"}
		</Button>
	);
};

export default HeaderLoginButton;
