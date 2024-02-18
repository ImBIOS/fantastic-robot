"use client";

import { gitmojis } from "gitmojis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import MinimalEmojiCard from "~/components/minimal-emoji-card";
import useGitmojiQuiz from "~/lib/hooks/use-gitmoji-quiz";

type Props = {
	children: React.ReactNode;
};

const HardQuiz = ({ children }: Props) => {
	const router = useRouter();
	const { currentQuestion, setNewQuestion } = useGitmojiQuiz();
	const [shake, setShake] = useState<string | null>(null);

	if (!currentQuestion) {
		return null;
	}

	const handleOnClick = async () => {
		setShake(currentQuestion.name);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setShake(null);
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<div
				className="sticky top-3 mx-5 mb-3 rounded-3xl bg-white px-4 py-10 text-center text-3xl font-bold text-gray-500 shadow-sm"
				onClick={handleOnClick}
				onKeyDown={handleOnClick}
			>
				{currentQuestion.description}
			</div>

			{children}

			<div className="grow-1 p-10">
				<div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
					{gitmojis.map((emoji) => (
						<>
							<MinimalEmojiCard
								emojiData={emoji}
								key={emoji.code}
								className={
									shake === emoji.name
										? "animate-shake animate-duration-100 animate-thrice"
										: ""
								}
								onClick={async () => {
									if (emoji.name === currentQuestion.name) {
										return setNewQuestion();
									}
									setShake(emoji.name);
									await new Promise((resolve) => setTimeout(resolve, 1000));
									setShake(null);
								}}
							/>
						</>
					))}
				</div>
			</div>
			<div className="flex flex-col items-center">
				<div className="mt-5">
					<button
						type="button"
						onClick={() => router.back()}
						className="cursor-pointer text-2xl font-bold text-red-500"
					>
						Back
					</button>
				</div>
				<div className="mb-5">
					<Link
						replace
						href="/learn/write/easy"
						className="text-2xl font-bold text-red-500"
					>
						Quiz for newbie
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HardQuiz;
