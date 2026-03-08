import { connect } from 'http2'
import React, { use } from 'react'
import connectDb from './lib/db'
import User from './models/user.model'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import EditRoleMobile from '@/components/EditRoleMobile'

async function Home() {


  await connectDb()
  const session = await auth();
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect("/login")
  }

 const InComplete = !user.mobile || !user.role
     if(InComplete){
       return <EditRoleMobile/>
     }
  
  return (

    <div>page</div>
  )
}

export default Home