'use client'

import styles from '../styles/CityContent.module.css'
import { useState, useEffect } from 'react';


export default function CityContent() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  let tempArr = [];

  useEffect(() => {
    setLoading(true)
    fetch('/api/cities')
      .then((res) => res.json())
      .then((data) => {
        setData(data.cityData)
        setLoading(false)
        
      })
  }, [])

  useEffect(() => {
    if (!search || search.length < 3) {
      setSuggestions([]);
      return;  
    }
    for (let i = 0; i < data?.length; i++) {
      if (data[i].properties.Name.toLowerCase().includes(search.toLowerCase())) {
        if (tempArr.length <= 2) {
          tempArr.push(data[i].properties)
        }
      }
    }
    setSuggestions(tempArr)
    console.log(suggestions)
  }, [search])
  return (
    <div className={styles.content_container}>
      <h1 className={styles.header}>Detroit</h1>
      <h5 className={styles.subheader}>Search for a restaurant</h5>
      <input placeholder={'Where you do you want to go?'} className={styles.input} onChange={(e) => setSearch(e.target.value)}/>
      <div className={styles.cities_container}>
        {isLoading ? <p>Loading...</p> : <div></div>}
        {suggestions.map((e, i) => {
          return (
            <div key={i} className={styles.city_container}>
              <h1 className={styles.city_name}>{e.Name}</h1>
              <p className={styles.city_address}>{e.Street_Address}</p>
            </div>
          )
        })}
      </div>
    </div>

  )
}

