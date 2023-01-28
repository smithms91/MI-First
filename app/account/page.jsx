'use client'
/*fix so page is not client rendered and session data lives on child components where it is used. or figure out if it matters because layout is client anyway lol */
import Image from 'next/image'
// Component Imports
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import MainContent from '@/components/DealContent'
//Styles
import styles from '@/styles/pages/AccountPage.module.scss'

import { useSession, signOut } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'




export default function AccountHome() {
  const { data: session, status } = useSession()
  console.log(status);
  if (status === "loading") {
    return (
      <>
        <main>
          <Navbar status={status} />
          <div className="">
            Loading.....
          </div>
          <MobileNavbar />
        </main>
      </>
    )
  }
  if (status !== 'authenticated') {
    redirect('/');
  }

  if (session && status == 'authenticated') {
    return (
      <>
        <main>
          <Navbar status={status} />
          <div className="">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <MobileNavbar />
        </main>
      </>
    )
  }
}