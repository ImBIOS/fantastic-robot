import { GithubIcon, TwitterIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";

const Footer = () => {
	return (
		<footer className="mt-8 flex h-16 w-full shrink-0 items-center border-t border-gray-100/90 px-4 dark:border-gray-800/90 md:px-6">
			<div className="container flex items-center justify-center gap-4 text-sm md:gap-6">
				<div className="flex items-center gap-2">
					🏫<span className="font-semibold">Gitmoji Academy</span>
				</div>
				{/* <nav className="flex flex-1 items-center justify-center gap-4">
					<Link
						className="[& + &]::before:content-['|'] flex items-center gap-2 text-sm font-medium"
						href="#"
					>
						Home
					</Link>
					<Link
						className="[& + &]::before:content-['|'] flex items-center gap-2 text-sm font-medium"
						href="#"
					>
						Features
					</Link>
					<Link
						className="[& + &]::before:content-['|'] flex items-center gap-2 text-sm font-medium"
						href="#"
					>
						Pricing
					</Link>
					<Link
						className="[& + &]::before:content-['|'] flex items-center gap-2 text-sm font-medium"
						href="#"
					>
						Contact
					</Link>
				</nav> */}
				<div className="flex items-center gap-4 md:ml-auto md:gap-2">
					<Button className="rounded-full" size="icon" variant="ghost">
						<TwitterIcon className="size-4" />
						<span className="sr-only">Twitter</span>
					</Button>
					<Button className="rounded-full" size="icon" variant="ghost">
						<GithubIcon className="size-4" />
						<span className="sr-only">GitHub</span>
					</Button>
					{/* TODO: Add LinkedIn */}
					{/* <Button className="rounded-full" size="icon" variant="ghost">
						<LinkedinIcon className="size-4" />
						<span className="sr-only">LinkedIn</span>
					</Button> */}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
