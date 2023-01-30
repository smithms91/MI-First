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
import { useState, useEffect } from 'react'

import InfoDialog from '../../components/dialogs/InfoDialog'
import EventDialog from '../../components/dialogs/EventDialog'
import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());



export default function AccountHome() {
  const { data: session, status } = useSession()
  const [editInfo, setEditInfo] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [loading, setLoading] = useState(false)

  const [userData, setUserData] = useState({});
  const [eventData, setEventData] = useState({});
  // const [newEvent, setNewEvent] = useState({
  //   eventName: '',
  //   date: Date.now(),
  //   location: {
  //       online: '',
  //       address: ''
  //   },
  //   hostEmail: '',
  //   description: '',
  //   likes: 0,
  //   restrictedAge: false
  // })


  const handleEditInfo = () => {
    if (!editInfo) setEditInfo(true); else setEditInfo(false);
  }


  const handleEditEvent = () => {
    if (!editEvent) setEditEvent(true); else setEditEvent(false);
  }



  const submitForm = (user) => {
    console.log(user)

    setLoading(true)
    fetch('/api/users/update', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
        setLoading(false)
      })
  }

  const addEvent = (postDetails) => {
    console.log(postDetails)

    setLoading(true)
    fetch('/api/events', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postDetails)
    })
      .then((res) => res.json())
      .then((data) => {
        setEventData(data)
        setLoading(false)
      })
  }

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
    let [firstName, lastName] = session.user.name.split(' ');
    let email = session.user.email
    let name = { firstName, lastName, email }
    return (
      <>
        <InfoDialog open={editInfo} handleClose={handleEditInfo} name={name} submitForm={submitForm} />
        <EventDialog open={editEvent} handleClose={handleEditEvent} submitForm={addEvent} />
        <main className={styles.mainContainer}>
          <Navbar status={status} />
          <div className={styles.contentContainer}>
            <h5>{session.user.email}</h5>
            <p onClick={() => signOut()}>Sign Out</p>
          </div>
          <div className={styles.controlPanel}>
            <button onClick={(e) => handleEditInfo()}>Edit Info</button>
            <button onClick={(e) => handleEditEvent()}>Add Event</button>
            <button>Add Deal</button>
          </div>
          <MobileNavbar />
        </main>
      </>
    )
  }
}