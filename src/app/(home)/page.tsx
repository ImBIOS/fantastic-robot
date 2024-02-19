import { Suspense } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { HomeActionButton } from "./home-action-button";

const Page = () => {
	return (
		<main className="container mx-auto mt-8 flex flex-col items-center justify-center md:max-w-6xl">
			<section className="flex min-h-screen flex-col items-center gap-4">
				<div className="my-4 flex flex-col items-center">
					<Badge variant="secondary">Launch Week 🎉 </Badge>
					<h1 className="my-4 inline-block bg-gradient-to-br from-white via-gray-300 to-gray-700 bg-clip-text p-4 text-center text-7xl font-semibold text-transparent">
						Gitmoji <b>Academy</b> is a better way to learn gitmoji
					</h1>
					<div>
						<p className="text-2xl text-gray-400">
							Meet the new AI-enabled learning for{" "}
							<a
								href="https://gitmoji.dev/"
								className="text-red-500 no-underline"
							>
								gitmoji!
							</a>
						</p>
					</div>
				</div>
				<div className="flex w-1/2 flex-col items-center justify-evenly gap-8">
					{/* <a
          href="https://github.com/ImBIOS/fantastic-robot"
          className="inline-block cursor-pointer rounded-lg bg-yellow-900 px-4 py-3 font-semibold text-white shadow-md hover:translate-y-0.5 hover:shadow-lg hover:shadow-white"
        >
          <span role="img" aria-label="star">
            ⭐️
          </span>{' '}
          Github
        </a> */}
					<Suspense fallback={<div>Loading...</div>}>
						<HomeActionButton />
					</Suspense>
					<a href="https://twitter.com/intent/tweet?text=Gitmoji%20Academy%20%E2%80%93%20platform%20to%20learn%20%23Gitmoji%2C%20an%20%23emoji%20for%20commit%20message%20by%20%40ImBIOS_Dev%20%F0%9F%98%8D%F0%9F%98%9C%20https%3A%2F%2Fgitmoji.academy.">
						<Button variant="outline" className="inline-block">
							<span role="img" aria-label="star">
								X
							</span>{" "}
							Share
						</Button>
					</a>
				</div>
				{/* <div className="flex scale-125 flex-col items-center">
        <div className="mt-5 scale-150">
          <Link href="/en/easy" className="text-2xl font-bold text-red-500">
            Quiz for newbies
          </Link>
        </div>
        <div className="mt-5 scale-150">
          <Link href="/en/hard" className="text-2xl font-bold text-red-500">
            Quiz for gurus
          </Link>
        </div>
      </div> */}
				{/* TODO: @see https://linear.app/ */}
				{/* TODO: @see https://codepen.io/raihanahmad/pen/qBZjrNW */}
				<div>TODO: Dashboard Preview</div>
			</section>
		</main>
	);
};

export default Page;
