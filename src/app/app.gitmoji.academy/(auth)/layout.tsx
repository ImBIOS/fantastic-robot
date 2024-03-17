import type { ReactNode } from "react";
import { Background } from "~/components/background";

export const runtime = "edge";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen w-screen justify-center">
			<Background />
			{children}
		</div>
	);
}
