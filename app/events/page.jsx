'use client'
/*fix so page is not client rendered and session data lives on child components where it is used. or figure out if it matters because layout is client anyway lol */
import Image from 'next/image'
// Component Imports
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import DealContent from '@/components/DealContent'
import CityContent from '@/components/CityContent'
//Styles
import styles from '@/styles/pages/EventPage.module.scss'
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
// import useSWR from "swr";
// const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Events() {
    const { data: session, status } = useSession()

    const [eventData, setEventData] = useState([]);
    const [retrieveData, setRetrieveData] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    // const { res, error } = useSWR('/api/events', fetcher);
    // console.log(res)


    useEffect(() => {
        setIsLoading(true);
        fetch('/api/events').then((res) => res.json()).then((data) => {
            setEventData([...data])
            setIsLoading(false);
        })
    }, [])

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

    return (
        <main>
            <Navbar status={status} />
            {isLoading &&
                <div>
                    <h1>Loading Content</h1>
                    <div className="tempBox">1</div>
                    <div className="tempBox">2</div>
                    <div className="tempBox">3</div>
                </div>
            }
            <h1>Events page</h1>
            {eventData.map((e, i) => {
                return (
                    <div>
                        <p>{e.eventName}</p>
                        <p>{new Date(e.date).toLocaleDateString()}</p>
                        <p>{e.hostEmail}</p>
                        <hr />
                    </div>
                )
            })}
            <MobileNavbar />
        </main>
    )
}