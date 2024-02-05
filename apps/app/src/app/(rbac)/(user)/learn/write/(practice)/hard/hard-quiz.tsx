'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gitmojis } from 'gitmojis'

import useGitmojiQuiz from '~/lib/hooks/use-gitmoji-quiz'
import MinimalEmojiCard from '~/components/minimal-emoji-card'

type Props = {
  children: React.ReactNode
}

const HardQuiz = ({ children }: Props) => {
  const router = useRouter()
  const { currentQuestion, setNewQuestion } = useGitmojiQuiz()
  const [shake, setShake] = useState<string | null>(null)

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="sticky top-3 mx-5 mb-3 rounded-3xl bg-white px-4 py-10 text-center text-3xl font-bold text-gray-500 shadow-sm"
        onClick={async () => {
          setShake(currentQuestion.name)
          await new Promise(resolve => setTimeout(resolve, 1000))
          setShake(null)
        }}
      >
        {currentQuestion.description}
      </div>

      {children}

      <div className="grow-1 p-10">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {gitmojis.map(emoji => (
            <>
              <MinimalEmojiCard
                emojiData={emoji}
                key={emoji.code}
                className={
                  shake === emoji.name
                    ? 'animate-shake animate-duration-100 animate-thrice'
                    : ''
                }
                onClick={async () => {
                  if (emoji.name === currentQuestion.name) {
                    return setNewQuestion()
                  }
                  setShake(emoji.name)
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  setShake(null)
                }}
              />
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-5">
          <a
            onClick={() => router.back()}
            className="cursor-pointer text-2xl font-bold text-red-500"
          >
            Back
          </a>
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
  )
}

export default HardQuiz
