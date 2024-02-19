import { gitmojis, type Gitmoji } from "gitmojis";

const HeroPreview = () => {
	const getEmoji = (arr: Gitmoji[]) => arr.map((item) => item.emoji);
	const firstHalfGitmojis = getEmoji(gitmojis.slice(0, gitmojis.length / 2));
	const secondHalfGitmojis = getEmoji(
		gitmojis.slice(gitmojis.length / 2, gitmojis.length),
	);

	return (
		<section className="shadow-neon relative mx-auto mb-0 mt-52 grid h-[500px] w-11/12 place-items-center bg-gray-800 py-8 text-8xl lg:w-3/4 lg:text-9xl">
			<div className="relative flex w-full overflow-x-hidden">
				<div className="animate-marquee whitespace-nowrap py-12">
					{firstHalfGitmojis.map((gitmoji) => (
						<span key={gitmoji} className="mx-4">
							{gitmoji}
						</span>
					))}
				</div>

				<div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
					{firstHalfGitmojis.map((gitmoji) => (
						<span key={gitmoji} className="mx-4">
							{gitmoji}
						</span>
					))}
				</div>
			</div>
			<div className="relative flex w-full overflow-x-hidden">
				<div className="animate-marquee whitespace-nowrap py-12">
					{secondHalfGitmojis.map((gitmoji) => (
						<span key={gitmoji} className="mx-4">
							{gitmoji}
						</span>
					))}
				</div>

				<div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12">
					{secondHalfGitmojis.map((gitmoji) => (
						<span key={gitmoji} className="mx-4">
							{gitmoji}
						</span>
					))}
				</div>
			</div>
		</section>
	);
};

export default HeroPreview;
