'use client'

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image'
import styles from '../styles/AboutContent.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AboutImage from '@/public/about-logo.jpg';


export default function AboutContent() {

  return (
    <div className={styles.content_container}>
      <Image className={styles.about_image} src={AboutImage} width={200} height={200} alt="About MI First" />
      <p><span className={styles.MI}>MI</span> <span className={styles.First}>First</span> combines custom local business profiles with comprehensive city profiles to offer communities a virtual hub where one can find an interactive directory of local businesses, the latest deals, and upcoming events in the area. </p>
      <p><span className={styles.MI}>MI</span> <span className={styles.First}>First</span> showcases businesses such as retail shops and restaurants through photography, video, and text while providing a great deal of flexibility and customization for business owners. Additionally, our MetroPicks and Featured Programs offer curated lists of the best businesses in your area. </p>
      <p><span className={styles.MI}>MI</span> <span className={styles.First}>First</span>, a one-stop metropolitan guide, is a perfect resource for those looking for Where To Go and What To Do. </p>
    </div>

  )
}

