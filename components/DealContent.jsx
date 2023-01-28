'use client'

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image'
import styles from '../styles/DealContent.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


export default function DealContent(props) {
  let data = props.data;

  return (
    <div className={styles.content_container}>
      <div className={styles.image_container}>
        <div className={styles.single_image_container}><FacebookIcon /></div>
        <div className={styles.single_image_container}><YouTubeIcon /></div>
        <div className={styles.single_image_container}><InstagramIcon /></div>
      </div>
      <h1 className={styles.main_header}>Where to Go. <span>What to Do.</span></h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className={styles.dealContainer}>
          <div className={`${styles.indivDeal} ${styles.imageOne}`}>
            <div className={styles.title}>Pat O' Brien's</div>
          </div>
          <div className={`${styles.indivDeal} ${styles.imageTwo}`}>
            <div className={styles.title}>Wally's Frozen Custard</div>
          </div>
          <div className={`${styles.indivDeal} ${styles.imageThree}`}>
            <div className={styles.title}>Pat O' Brien's</div>
          </div>
        </div>
      </Suspense>
      <button className={styles.dealButton}>View all deals</button>
    </div>

  )
}

