import { type Gitmoji } from 'gitmojis'

import { colors } from '~/lib/data/colors'
import { cn } from '~/lib/utils'

interface EmojiCardProps {
  emojiData: Gitmoji
  onClick: () => void
  className?: string
}

const EmojiCard = ({ emojiData, onClick, className }: EmojiCardProps) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col overflow-hidden rounded-3xl border bg-background shadow-sm',
        className
      )}
      onClick={onClick}
    >
      <div
        className="flex items-center justify-center"
        style={{ backgroundColor: colors[emojiData.name] }}
      >
        <div className="scale-150">
          <div className="scale-150">
            <div className="scale-150 p-28 text-6xl md:text-3xl">
              {emojiData.emoji}
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow items-center justify-center">
        <div className="p-4 text-xl font-bold sm:text-sm md:text-base lg:text-lg xl:text-xl">
          {emojiData.code}
        </div>
      </div>
    </div>
  )
}

export default EmojiCard
