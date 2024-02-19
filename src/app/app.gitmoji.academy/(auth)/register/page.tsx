import { Suspense } from "react";
import { BlurImage } from "~/components/blur-image";
import Logo from "~/components/logo";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { HOME_DOMAIN } from "~/lib/constant";
import { constructMetadata } from "~/lib/utils";
import RegisterForm from "./form";

export const metadata = constructMetadata({
	title: `Create your ${env.NEXT_PUBLIC_APP_NAME} account`,
});

const logos = [
	"vercel",
	"perplexity",
	"prisma",
	"tinybird",
	"hashnode",
	"cal",
	"vercel",
	"perplexity",
	"prisma",
	"tinybird",
	"hashnode",
	"cal",
];

export default function RegisterPage() {
	return (
		<div className="grid w-full grid-cols-1 md:grid-cols-3">
			<div className="col-span-1 flex items-center justify-center md:col-span-2">
				<div className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
					<div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
						<a href={HOME_DOMAIN}>
							<Logo className="size-10" />
						</a>
						<h3 className="text-xl font-semibold">
							Create your {process.env.NEXT_PUBLIC_APP_NAME} account
						</h3>
						<p className="text-sm text-gray-500">
							Get started for free. No credit card required.
						</p>
					</div>
					<div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
						<Suspense
							fallback={
								<>
									<Button disabled variant="secondary" />
									<div className="mx-auto h-5 w-3/4 rounded-lg bg-gray-100" />
								</>
							}
						>
							<RegisterForm />
						</Suspense>
					</div>
				</div>
			</div>
			<div className="hidden h-full flex-col justify-center space-y-12 overflow-hidden border-l border-gray-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur md:flex">
				<a
					href={`${HOME_DOMAIN}/features/analytics`}
					target="_blank"
					className="ml-12 h-1/2 w-[150%] rounded-xl border border-gray-200 bg-white/90 p-4 shadow-xl"
					rel="noreferrer"
				>
					<BlurImage
						alt="Dub.co Analytics"
						src="https://d2vwwcvoksz7ty.cloudfront.net/features/analytics.png"
						width={1735}
						height={990}
						className="h-full rounded-xl border border-gray-200 object-cover shadow-md"
					/>
				</a>
				<a
					href={`${HOME_DOMAIN}/customers`}
					target="_blank"
					className="animate-infinite-scroll flex items-center space-x-4"
					rel="noreferrer"
				>
					{logos.map((logo) => (
						<BlurImage
							alt={`${logo} logo`}
							key={logo}
							src={`${HOME_DOMAIN}/_static/clients/${logo}.svg`}
							width={520}
							height={182}
							className="h-12 grayscale transition-all hover:grayscale-0"
						/>
					))}
				</a>
			</div>
		</div>
	);
}