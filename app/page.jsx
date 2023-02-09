'use client' 
/*fix so page is not client rendered and session data lives on child components where it is used. or figure out if it matters because layout is client anyway lol */
import Image from 'next/image'
// Component Imports
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import DealContent from '@/components/DealContent'
import GrowBusiness from '@/components/GrowBusiness'
import DirectoryContent from '@/components/DirectoryContent'
import CityContent from '@/components/CityContent'
//Styles
import styles from '@/styles/pages/HomePage.module.scss'


import { useSession } from "next-auth/react"
import { useEffect } from 'react'


export default function Home() {
  const { data: session, status } = useSession()
  useEffect(() => {window.scrollTo(0, 0)}, []);



  return (
    <main>
      <Navbar status={status}/>
      <DealContent />
      <GrowBusiness status={{getStarted: true, update: true}} />
      <DirectoryContent />
      <MobileNavbar />
    </main>
  )
}