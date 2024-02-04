'use client'

import { useState } from 'react'

import useGitmojiQuiz from '~/lib/hooks/use-gitmoji-quiz'
import EmojiCard from '~/components/emoji-card'
import { api } from '~/trpc/react'

type Props = {
  children: React.ReactNode
}

const EasyQuiz = ({ children }: Props) => {
  const { currentQuestion, choices, setNewQuestion } = useGitmojiQuiz()
  const [shake, setShake] = useState<string | null>(null)

  const utils = api.useUtils()
  const incrementExpBy = api.points.incrementBy.useMutation({
    onMutate: async input => {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.points.get.cancel()

      // Get the data from the queryCache
      const prevData = utils.points.get.getData()

      // Optimistically update the data with our new post
      utils.points.get.setData(undefined, old =>
        old ? { ...old, exp: old.exp + input } : undefined
      )

      // Return the previous data so we can revert if something goes wrong
      return { prevData }
    },
    onError: (err, newPoint, ctx) => {
      // If the mutation fails, use the context-value from onMutate
      utils.points.get.setData(undefined, ctx?.prevData)
    },
    onSettled: async () => {
      // Sync with server once mutation has settled
      await utils.points.get.invalidate()
    }
  })

  const decrementExpBy = api.points.decrementBy.useMutation({
    onMutate: async input => {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.points.get.cancel()

      // Get the data from the queryCache
      const prevData = utils.points.get.getData()

      // Optimistically update the data with our new post
      utils.points.get.setData(undefined, old =>
        old ? { ...old, exp: old.exp - input } : undefined
      )

      // Return the previous data so we can revert if something goes wrong
      return { prevData }
    },
    onError: (err, newPoint, ctx) => {
      // If the mutation fails, use the context-value from onMutate
      utils.points.get.setData(undefined, ctx?.prevData)
    },
    onSettled: async () => {
      // Sync with server once mutation has settled
      await utils.points.get.invalidate()
    }
  })

  if (!currentQuestion || !choices) {
    return null
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <div className="sticky top-3 mx-5 mb-3 rounded-3xl bg-background px-4 py-10 text-center text-3xl font-bold text-card-foreground shadow-sm">
        {currentQuestion.description}
      </div>

      {children}

      <div className="grid grow grid-cols-2 gap-10 p-5 sm:grid-cols-2">
        {choices.map(emoji => (
          <EmojiCard
            emojiData={emoji}
            key={emoji.name}
            className={
              shake === emoji.name
                ? 'animate-shake animate-duration-100 animate-thrice'
                : ''
            }
            onClick={async () => {
              if (emoji.name === currentQuestion.name) {
                incrementExpBy.mutate(1)
                return setNewQuestion()
              }
              setShake(emoji.name)
              decrementExpBy.mutate(10)
              await new Promise(resolve => setTimeout(resolve, 1000))
              setShake(null)
            }}
          />
        ))}
      </div>

      {/* <div className="flex flex-col items-center">
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
            href="/learn/write/hard"
            className="text-2xl font-bold text-red-500"
          >
            Quiz for gurus
          </Link>
        </div>
      </div> */}
    </div>
  )
}

export default EasyQuiz
