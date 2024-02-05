import { Button } from '~/components/ui/button'
import { auth, signIn } from '~/server/auth'

import { UserNav } from '../(rbac)/(admin)/dashboard/_components/user-nav'

const HeaderActionButton = async () => {
  const session = await auth()

  return (
    <>
      {!!session?.user ? (
        <UserNav user={session.user} />
      ) : (
        <form
          action={async () => {
            'use server'
            await signIn()
          }}
        >
          <Button size="sm" type="submit">
            Sign In
          </Button>
        </form>
      )}
    </>
  )
}

export default HeaderActionButton
