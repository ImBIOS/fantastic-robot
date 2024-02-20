import { gitmojis } from "gitmojis";
import GitmojiItem from "./gitmoji-item";

const HeroPreview = () => {
	const firstHalfGitmojis = gitmojis.slice(0, gitmojis.length / 2);
	const secondHalfGitmojis = gitmojis.slice(
		gitmojis.length / 2,
		gitmojis.length,
	);

	return (
		<section className="shadow-neon relative mx-auto mb-0 mt-52 grid h-[500px] w-11/12 cursor-default place-items-center rounded-md bg-gray-800 py-8 text-8xl lg:w-3/4 lg:text-9xl">
			<div className="relative flex w-full overflow-x-hidden">
				<div className="animate-marquee whitespace-nowrap py-12">
					{firstHalfGitmojis.map((gitmoji) => (
						<GitmojiItem key={gitmoji.emoji} gitmoji={gitmoji} />
					))}
				</div>

				<div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
					{firstHalfGitmojis.map((gitmoji) => (
						<GitmojiItem key={gitmoji.emoji} gitmoji={gitmoji} />
					))}
				</div>
			</div>
			<div className="relative flex w-full overflow-x-hidden">
				<div className="animate-marquee whitespace-nowrap py-12">
					{secondHalfGitmojis.map((gitmoji) => (
						<GitmojiItem key={gitmoji.emoji} gitmoji={gitmoji} />
					))}
				</div>

				<div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
					{secondHalfGitmojis.map((gitmoji) => (
						<GitmojiItem key={gitmoji.emoji} gitmoji={gitmoji} />
					))}
				</div>
			</div>
		</section>
	);
};

export default HeroPreview;
