'use client' 
/*fix so page is not client rendered and session data lives on child components where it is used. or figure out if it matters because layout is client anyway lol */
import Image from 'next/image'
// Component Imports
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import DealContent from '@/components/DealContent'
import CityContent from '@/components/CityContent'
//Styles
import styles from '@/styles/pages/ProgramPage.module.scss'


import { useSession } from "next-auth/react"


export default function Programs() {

  const { data: session, status } = useSession()

  // async function getProjects(name) {
  //   const res = await fetch(`http://localhost:3000/api/getUserData`, { cache: 'no-store' });
  //   const projects = await res.json();
  
  //   return projects;
  // }
  
  // const projects = await getProjects('smithms91');


  return (
    <main>
      <Navbar status={status}/>
      <p>Program Page</p>
      <MobileNavbar />
    </main>
  )
}