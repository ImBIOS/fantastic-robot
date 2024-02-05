import { useCallback, useEffect, useState } from 'react'
import { gitmojis, type Gitmoji } from 'gitmojis'

import { sampleSize, shuffleArray } from '../utils'

const useGitmojiQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Gitmoji | null>(null)
  const [choices, setChoices] = useState<Gitmoji[] | null>(null)

  const setNewQuestion = useCallback(() => {
    const [question, ...possibleAnswers] = sampleSize([...gitmojis], 4)
    if (question) {
      setCurrentQuestion(question)
      setChoices(shuffleArray([question, ...possibleAnswers]))
    } else {
      // Handle the case when question is undefined
      // For example, you can set it to null
      setCurrentQuestion(null)
      setChoices(null)
    }
  }, [])

  useEffect(() => {
    setNewQuestion()
  }, [setNewQuestion])

  return { currentQuestion, choices, setNewQuestion }
}

export default useGitmojiQuiz
