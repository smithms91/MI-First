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
import { useState, useEffect } from 'react';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Events() {
    const { data: session, status } = useSession()

    const [eventData, setEventData] = useState([]);
    const [retrieveData, setRetrieveData] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    
    function useUser () {
        const { data, error } = useSWR('/api/events', fetcher);
        return {
            user: data,
            isLoading,
            isError: error
          }
    }

    // let newEvent = {
    //     eventName: 'This is a wicked test event!',
    //     date: Date.now(),
    //     location: {
    //         online: false,
    //         address: '22533 Address Name'
    //     },
    //     hostEmail: 'a@gmail.com',
    //     description: 'This will be our second annual test event at 22533 Address Name. Make sure you bring yourself to this event!',
    //     likes: 0,
    //     restrictedAge: false
    // }


    // if (!status == 'authenticated') {
    //     fetch(`/api/events/${session.user.email}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newEvent)
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setEventData(data)
    //             setIsLoading(false)
    //             // console.log(data)
    //         })
    // } else {
    //     const { data, error } = useSWR('/api/events', fetcher);
    //     // fetch('/api/events')
    //     //     .then((res) => res.json())
    //     //     .then((data) => {
    //     setEventData(data)
    //     setIsLoading(false)
    //     // console.log(data)
    //     // })
    // }
    // }, [])
    // if (session && status == 'authenticated') {
    //     let tempData = getEventData();
    //     setEventData(tempData)
    // }

    // async function getProjects(name) {
    //   const res = await fetch(`http://localhost:3000/api/getUserData`, { cache: 'no-store' });
    //   const projects = await res.json();

    //   return projects;
    // }

    // const projects = await getProjects('smithms91');


    return (
        <main>
            <Navbar status={status} />
            {isLoading &&
                <div>
                    <h1>Loading Content</h1>
                    <div className="tempBox">1</div>
                    <div className="tempBox">2</div>
                    <div className="tempBox">3</div>
                </div>}
            <p>Events Page</p>
            {eventData.map((e, i) => {
                return <p>{e.eventName}</p>
            })}
            <MobileNavbar />
        </main>
    )
}