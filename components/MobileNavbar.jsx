'use client'

import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import InfoIcon from '@mui/icons-material/Info';
import styles from '../styles/MobileNavbar.module.css'
import Link from 'next/link';

export default function MobileNavbar() {


    return (
        <div className={styles.mobilenav_container}>
            <ul className={styles.mobilenav_ul}>
                <Link style={{'textDecoration': 'none'}} href={'/'}>
                    <div className={styles.mobilenav_div}>
                        <HomeIcon sx={{ fontSize: 30 }} style={{ color: 'white' }} />
                        <li className={styles.mobilenav_li}>Home</li>
                    </div>
                </Link>
                <Link style={{'textDecoration': 'none'}} href={'/deals'}>
                    <div className={styles.mobilenav_div}>
                        <LoyaltyIcon sx={{ fontSize: 30 }} style={{ color: 'white' }} />
                        <li className={styles.mobilenav_li}>Deals</li>
                    </div>
                </Link>
                <Link style={{'textDecoration': 'none'}} href={'/cities'}>
                    <div className={styles.mobilenav_div}>
                        <LocationCityIcon sx={{ fontSize: 30 }} style={{ color: 'white' }} />
                        <li className={styles.mobilenav_li}>City</li>
                    </div>
                </Link>
                <Link style={{'textDecoration': 'none'}} href={'/events'}>
                <div className={styles.mobilenav_div}>
                    <FolderSpecialIcon sx={{ fontSize: 30 }} style={{ color: 'white' }} />
                    <li className={styles.mobilenav_li}>Events</li>
                </div>
                </Link>
                <Link style={{'textDecoration': 'none'}} href={'/about'}>
                <div className={styles.mobilenav_div}>
                    <InfoIcon sx={{ fontSize: 30 }} style={{ color: 'white', }} />
                    <li className={styles.mobilenav_li}>About</li>
                </div>
                </Link>
            </ul>
        </div>
    )
}