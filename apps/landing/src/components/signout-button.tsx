'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { useFormStatus } from 'react-dom'

import { cn } from '~/lib/utils'

import { IconSpinner } from './icons'
import { Button } from './ui/button'

const SignoutButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="ghost"
      type="submit"
      size="sm"
      aria-disabled={pending}
      className={cn(
        'flex items-center px-2',
        pending && 'cursor-not-allowed opacity-50'
      )}
    >
      {pending ? (
        <IconSpinner className="mr-2" />
      ) : (
        <ExitIcon className="mr-2" />
      )}
      Sign Out
    </Button>
  )
}

export default SignoutButton
