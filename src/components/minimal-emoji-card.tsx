import { type Gitmoji } from "gitmojis";

import { colors } from "~/lib/data/colors";
import { cn } from "~/lib/utils";

interface EmojiCardProps {
	emojiData: Gitmoji;
	onClick: () => void;
	className?: string;
}

const MinimalEmojiCard = ({
	emojiData,
	onClick,
	className,
}: EmojiCardProps) => {
	return (
		<div
			style={{
				backgroundColor: colors[emojiData.name],
			}}
			onClick={onClick}
			onKeyDown={onClick}
			className={cn(
				className,
				"flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-10 text-7xl shadow-sm",
			)}
		>
			{emojiData.emoji}
		</div>
	);
};

export default MinimalEmojiCard;
