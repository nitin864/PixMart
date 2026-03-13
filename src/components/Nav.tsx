import { auth } from '@/auth'
import connectDb from '@/app/lib/db'
import User from '@/app/models/user.model'
import NavClient from './NavClient'

async function Nav() {
  await connectDb()

  const session = await auth()

  const user = session?.user?.id
    ? await User.findById(session.user.id)
    : null

  return (
    <NavClient
      userName={user?.name ?? session?.user?.name ?? null}
      userImage={user?.image ?? session?.user?.image ?? null}
      userRole={session?.user?.role ?? null}
    />
  )
}

export default Nav