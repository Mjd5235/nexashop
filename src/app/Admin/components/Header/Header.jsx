"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/SubaBaseClient'
import styles from './Header.module.css'

const InterSans = Inter({
  subsets: ['latin'],
  weight: ['900'],
})

export default function Header() {

  const [LogBut, setLogBut] = useState(false)
  const [Name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [role, setRole] = useState("admin")

  const [ProfB, SetProB] = useState(false)

  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        SetProB(false);
      }
    };
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  useEffect(() => {
    const GetUsers = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        setName(data.user.user_metadata.name)
        setEmail(data.user.email)
        setAvatar(data.user.user_metadata.name.charAt(0).toUpperCase())
        if (error) {
          console.log(error.message)
        }
      }
    }
    GetUsers()
  }, [])

  const RemoveUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      const { error } = await supabase.auth.signOut()
      if (error) {
        alert(error)
      }
      else {
        setName(null)
        window.location.reload()
      }
    }
  }

  return (
    <div className={styles.headerContainer}>

      <div className={styles.logo}>
        <Link href='/'>
          <div className={InterSans.className}>
            <span>Nexa</span><span className={styles.blueLogo}>Shop</span>
          </div>
        </Link>
      </div>

      <div className={styles.rightSection}>

        <div className={styles.profileMenuWrapper} ref={ref}>
          <button onClick={() => { SetProB(prev => !prev) }} className={styles.profileButton}>
            <div className={styles.avatarCircle}>
              <h3 className={`${styles.logname} ${styles.avatarText}`}>
                {avatar}
              </h3>
            </div>
          </button>

          {ProfB && (
            <div className={styles.dropdownBox} style={{ height: role ? "265px" : "175px" }}>
              <div className={styles.dropdownHeader}>
                <div className={styles.avatarCircle}>
                  <h3 className={`${styles.logname} ${styles.avatarText}`}>
                    {avatar}
                  </h3>
                </div>
                <div className={styles.dropdownInfo}>
                  <h3 className={styles.dropdownName}>
                    {!role ? `welcome ${Name}` : Name}{role && ` - ${role}`}
                  </h3>
                  <h4 className={styles.dropdownEmail}>{email}</h4>
                </div>
              </div>

              <div>
                <div className={styles.homeLinkWrapper}>
                  <Link href='/' className={`${styles.orders} ${styles.homeLink}`}>
                    <span className={styles.homeLinkContent}>
                      <Image className={styles.homeIcon} src='/Admin/Icons/Home.svg' width={25} height={25} alt="Dashboard" />
                      Home
                    </span>
                  </Link>
                </div>
                <div className={styles.logoutWrapper}>
                  <button className={`${styles.logout}`} onClick={RemoveUser}>
                    <Image src='/help_icons/logout.svg' width={25} height={25} alt="Logout" />
                    <span className={styles.logoutText}>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}