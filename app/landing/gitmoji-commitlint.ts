import { readFileSync } from 'fs'
import { resolve } from 'path'
import { gitmojis } from 'gitmojis'

const commitMsgFilePath = process.argv[2]
const gitmojiPrefixes = gitmojis.map(gitmoji => gitmoji.emoji)

function isValidCommitMessage(message: string): boolean {
  // Rule 1: Commit message must start with a gitmoji
  const gitmojiPrefix = gitmojiPrefixes.find(prefix =>
    message.startsWith(prefix)
  )

  if (!gitmojiPrefix) {
    console.error(
      `Commit message does not start with ${gitmojiPrefixes.join(', ')}.`
    )
    process.exit(1)
  }

  // Rule 2: Commit message must have a subject
  const subject = message.split('\n')[0]?.replace(gitmojiPrefix, '').trim()
  console.log({ subject })

  if (!subject) {
    console.error('Commit message must have a subject.')
    process.exit(1)
  }

  // Rule 3: Commit message subject after gitmoji must start with a capital letter
  const subjectStartsWithCapitalLetter = /^[A-Z]/.test(subject)

  if (!subjectStartsWithCapitalLetter) {
    console.error('Commit message subject must start with a capital letter.')
    process.exit(1)
  }

  return false
}

function main() {
  if (!commitMsgFilePath) {
    console.error('No commit message file path provided.')
    process.exit(1)
  }

  const commitMsg = readFileSync(resolve(commitMsgFilePath), 'utf-8').trim()
  isValidCommitMessage(commitMsg)
}

main()
