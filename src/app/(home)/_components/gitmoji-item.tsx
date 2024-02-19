"use client";
import { type Gitmoji } from "gitmojis";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/ui/tooltip";

type Props = {
	gitmoji: Gitmoji;
};

const GitmojiItem = ({ gitmoji }: Props) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<span className="mx-4">{gitmoji.emoji}</span>
				</TooltipTrigger>
				<TooltipContent
					align="center"
					alignOffset={100}
					sideOffset={-100}
					hideWhenDetached
					className="rounded-md bg-gray-600 p-4"
				>
					<p>Name: {gitmoji.name}</p>
					<p>Code: {gitmoji.code}</p>
					{gitmoji.semver && <p>Semver: {gitmoji.semver}</p>}
					<p>Entity: {gitmoji.entity}</p>
					<p>Description: {gitmoji.description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default GitmojiItem;
