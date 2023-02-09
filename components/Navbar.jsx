'use client'

import Image from 'next/image'
import Logo from '../public/mifirst.svg'
import styles from '../styles/Navbar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useState } from 'react'
import { useSession } from "next-auth/react"
import Input from '@mui/material/Input';


export default function Navbar(props) {
    const [searchBar, setSearchBar] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter();
    let user = props.status;

    useEffect(() => {

    }, [status])

    const handleAccountPage = async (e) => {
        e.preventDefault()
        if (user == 'authenticated') {
            let obj = {
                action: 'create-user',
                firstName: session.user.name.split(' ')[0],
                lastName: session.user.name.split(' ')[1],
                email: session.user.email
            }

            let data = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(obj)
            });
            router.push('/account')
        } else {
            router.push('/login')
        }

    }

    const handleSearchInput = async (e) => {
        e.preventDefault()
        setSearchBar(!searchBar);
    }

    const handleKeyDown = (e) => {
        
        if(e.key == "Enter") {
            console.log(searchValue)
            setSearchValue('')
            router.push(`/search/${searchValue}`)
        }
    }

    /*Fix later make button not clickable but still there*/
    return (
        <div className={styles.navbar_container}>
            <div className={styles.icon_container}>
                <Image className={styles.navCursor} onClick={() => router.push('/')} width={150} src={Logo} alt={'MI First Logo'} />
                <div className={styles.account_box}>

                    {props.status === 'authenticated' ? <PersonIcon onClick={(e) => handleAccountPage(e)} className={styles.navCursor} style={{ color: 'white' }} /> : <PersonIcon onClick={(e) => signIn("google", { callbackUrl: '/account' })} className={styles.navCursor} style={{ color: 'white' }} />}
                    <SearchIcon className={styles.navCursor} onClick={(e) => handleSearchInput(e)} style={{ color: 'white' }} />
                </div>
            </div>
            { searchBar && <Input placeholder={'ex. City or Location'} autoFocus className={styles.searchInput} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} value={searchValue} />}
        </div>
    )
}