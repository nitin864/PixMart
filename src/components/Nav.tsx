import { auth } from '@/auth'
import connectDb from '@/app/lib/db'
import User from '@/app/models/user.model'
import NavClient from './NavClient'

async function Nav() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)

  return (
    <NavClient
      userName={user?.name ?? null}
      userImage={user?.image ?? null}
    />
  )
}

export default Nav