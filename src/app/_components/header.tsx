import Link from "next/link";
import { Suspense } from "react";

import ThemeSelector from "~/components/theme-selector";

import HeaderActionButton from "./header-action-button";

const Header = () => {
	return (
		<header className="sticky top-0 z-10 border-b border-gray-400/10 bg-transparent backdrop-blur-xl">
			<nav className="mx-4 my-2 flex h-12 items-center justify-between">
				<Link
					href={"/"}
					className="hidden items-center justify-between gap-2 md:flex"
				>
					<p className="text-md font-semibold">🏫 Gitmoji Academy</p>
				</Link>

				<div className="flex items-center gap-2">
					<ThemeSelector />

					<Suspense
						fallback={<div className="size-8 animate-pulse rounded-full" />}
					>
						<HeaderActionButton />
					</Suspense>
				</div>
			</nav>
		</header>
	);
};

export default Header;
