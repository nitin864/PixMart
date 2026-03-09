import { connect } from 'http2'
import React, { use } from 'react'
import connectDb from './lib/db'
import User from './models/user.model'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import EditRoleMobile from '@/components/EditRoleMobile'
import Nav from '@/components/Nav'

async function Home() {


  await connectDb()
  const session = await auth();
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }

  const InComplete = !user.mobile || !user.role
  if (InComplete) {
    return <EditRoleMobile />
  }

  return (

    <div className="flex flex-col min-h-screen w-full items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 60% 0%, #052e16 0%, #0a0a0a 60%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}>
      <Nav user={user}/>
    </div>
  )
}

export default Home