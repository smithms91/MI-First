'use client'

import styles from '../styles/DirectoryContent.module.css'
import Logo from '@/public/mifirst.svg'
import Image from 'next/image';
import { useState, useEffect } from 'react'

export default function AboutContent() {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 500) {
            setVisible(true)
            console.log('now')
        }
        else if (scrolled <= 300) {
            setVisible(false)
            console.log('now')
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', toggleVisible);
        
        return function() {
            window.removeEventListener('scroll', toggleVisible)
        }
    }, [])
    // window.removeEventListener('scroll', toggleVisible)
    return (
        <div className={styles.directory_container}>
            <button style={{right: visible == true ? '1rem' : '-4rem'}} onClick={() => scrollToTop()} className={styles.scroll_btn}>^</button>
            <h1>Site Directory</h1>
            <ul>
                <li>Home</li>
                <li>Nearby Destinations</li>
                <li>Programs</li>
                <li>Business Directory</li>
                <li>Get Listed</li>
                <li>Contact Us</li>
                <li>About</li>
            </ul>
            <hr style={{ marginTop: '1rem', width: '90%' }} />
            <h1>Nearby Cities</h1>
            <ul>
                <li>St. Clair Shores</li>
                <li>Warren</li>
                <li>The Hill</li>
                <li>Sterling Heights</li>
                <li>Mount Clemens</li>
                <li>Madison Heights</li>
                <li>Ferndale</li>
            </ul>
            <hr style={{ marginTop: '1rem', width: '90%' }} />
            <h1>Featured Programs</h1>
            <ul>
                <li>Carry Out Corridor</li>
                <li>Eastside Happy Hour</li>
                <li>Entertainment Ferndale</li>
                <li>Entertainment Plymouth</li>
                <li>Woodward Brunch</li>
                <li>Whats for Breakfast Lansing</li>
                <li>Whats for Lunch</li>
            </ul>
            <hr style={{ marginTop: '1rem', width: '90%' }} />
            <h1>MI First Family</h1>
            <ul>
                <li>Dirty Dog Jazz Cafe</li>
                <li>Toast Restaurant</li>
                <li>Metropolitan Baking</li>
                <li>Jazz Nexus</li>
                <li>Grosse Point Village</li>
                <li>Otus Supply</li>
                <li>Greek Islands Coney</li>
            </ul>
            <hr style={{ marginTop: '1rem', width: '90%' }} />
            <h1>Social Media</h1>
            <ul>
                <li>Facebook</li>
                <li>Youtube</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Tik Tok</li>
            </ul>
            <hr style={{ marginTop: '1rem', width: '90%' }} />

            <Image src={Logo} width={150} height={100} alt="MI First Logo" />
        </div>

    )
}

