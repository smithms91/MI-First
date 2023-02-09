'use client'
/*fix so page is not client rendered and session data lives on child components where it is used. or figure out if it matters because layout is client anyway lol */
import Image from 'next/image'
// Component Imports
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import MainContent from '@/components/DealContent'
//Styles
import styles from '@/styles/pages/AccountPage.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useSession, signOut } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InfoDialog from '../../components/dialogs/InfoDialog'
import EventDialog from '../../components/dialogs/EventDialog'
import ModifyEventDialog from '../../components/dialogs/ModifyEventDialog'
import EditIcon from '@mui/icons-material/Edit';

// const fetcher = (url) => fetch(url).then((res) => res.json());



export default function AccountHome() {
  const { data: session, status } = useSession()
  const [editInfo, setEditInfo] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [eventData, setEventData] = useState({});
  const [deletedEvent, setDeletedEvent] = useState('')
  const [currentEvent, setCurrentEvent] = useState({})


  useEffect(() => {
    if (status == 'authenticated') {
      fetch(`/api/events/${session.user.email}`).then((res) => res.json()).then((data) => {
        setUserEvents([...data]);
        console.log(userEvents)
      })
    }

  }, [status])

  useEffect(() => {
  }, [userEvents])

  const handleEditInfo = () => {
    if (!editInfo) setEditInfo(true); else setEditInfo(false);
  }

  const handleEditEvent = () => {
    if (!editEvent) setEditEvent(true); else setEditEvent(false);
  }



  const submitForm = (user) => {
    setLoading(true)
    fetch('/api/users', {
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
    let params = {
      postDetails,
      action: 'create-event'
    }

    setLoading(true)
    fetch('/api/events', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.json())
      .then((data) => {
        let mutableEvents = [...userEvents];
        mutableEvents.push(data.response)
        console.log(mutableEvents)
        setUserEvents(mutableEvents)
        setLoading(false)
      })

  }

  const handleDeleteEvent = (eventName) => {
    let params = {
      eventName,
      action: 'delete-event'
    }
    setLoading(true)
    fetch('/api/events', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.json())
      .then((data) => {
        let deletedEventName = data.response.eventName
        let mutableEvents = [...userEvents];
        mutableEvents.forEach((e, i) => {
          if (e.eventName == deletedEventName) {
            mutableEvents.splice(i, 1);
            setUserEvents(mutableEvents)
          }
        });
        setLoading(false)
      })

  }

  const handleModifyEvent = (event) => {
    setCurrentEvent(event);
    let params = {
      event,
      action: 'modify-event'
    }
    setLoading(true)
    fetch('/api/events', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // let modifiedEventName = data.response.eventName
        // let mutableEvents = [...userEvents];
        // mutableEvents.forEach((e, i) => {
        //   if (e.eventName == modifiedEventName) {
        //     mutableEvents.splice(i, 1);
        //     setUserEvents(mutableEvents)
        //   }
        // });
        // setLoading(false)
      })

  }

  if (status === "loading") {
    return (
      <>
        <main>
          <Navbar status={status} />
          <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'height': '85vh'}}>
            <CircularProgress size='4rem' />
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
        <Dialog className={styles.backgroundDark} onClose={(e) => setOpen(!open)} open={open}>
          <DialogTitle className={styles.eventTitle}>{deletedEvent}</DialogTitle>
          <DialogTitle className={styles.dialogHeader}>Are you sure?</DialogTitle>
          <p className={styles.dialogText}>You will have to recreate this event and will lose any data associated with this event.</p>
          <Button className={styles.dialogButton} onClick={() => { handleDeleteEvent(deletedEvent); setOpen(!open); }}>Delete Forever</Button>
        </Dialog>
        
        <ModifyEventDialog open={editOpen} handleClose={setEditOpen} user={email} event={currentEvent} submitForm={handleEditEvent} />
        <InfoDialog open={editInfo} handleClose={handleEditInfo} name={name} submitForm={submitForm} />
        <EventDialog open={editEvent} handleClose={handleEditEvent} submitForm={addEvent} user={email} />

        <main className={styles.mainContainer}>
          <Navbar status={status} />
          <div className={styles.contentContainer}>
            <h5>{session.user.email}</h5>
            <p onClick={() => signOut()}>Sign Out</p>
          </div>
          <div className={styles.eventContainer}>

          </div>
          <div className={styles.controlPanel}>
            <button onClick={(e) => handleEditInfo()}>Edit Info</button>
            <button onClick={(e) => handleEditEvent()}>Add Event</button>
            <button>Add Deal</button>
          </div>

          <br />
          <div className={styles.accountContainer}>
            <h1>My Events</h1>
            {userEvents.slice(0).reverse().map((e, i) => {
              return (
                <div className={styles.singleEvent}>
                  <p className={styles.eventName}>{e.eventName}</p>
                  <EditIcon onClick={() => { setEditOpen(!editOpen); handleModifyEvent(e) }}  />
                  <CloseIcon onClick={() => { setOpen(!open); setDeletedEvent(e.eventName) }} />
                </div>
              )
            })}
          </div>
          <MobileNavbar />
        </main>
      </>
    )
  }
}