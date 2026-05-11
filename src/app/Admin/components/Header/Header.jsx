"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/SubaBaseClient'
import styles from '@/components/Header/Header.module.css'

const MontserratSans = Montserrat({
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
      }
    }
  }


  return (
    <div style={{ height: "75px", borderRadius: "32px", border: "solid 0px #1a75e8", background: " linear-gradient(to right, #1a1a1a, #3a3a3a )", display: 'flex', justifyContent: "space-between" }}>

      <div style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: "150px", display: "flex", }}>

        <h2 style={{ float: "left", color: "#fff", marginLeft: "-50px", padding: "25px", fontSize: "20px", }}><span className={MontserratSans.className}>NexaShop</span></h2>
      </div>
      <div style={{ display: 'flex', marginRight: "-800px" }}>

      </div>
      <div style={{ display: "flex", paddingRight: "20px", marginLeft: "100px", marginRight: "50px" }}>
        <Image style={{ display: 'flex', marginTop: "25px", marginLeft: "40px", cursor: "pointer" }} src={'/Admin/Icons/darkmode.svg'} width={25} height={25} alt='darkmode' />
        <Image style={{ display: 'flex', marginTop: "25px", marginLeft: "30px", marginRight: "50px", cursor: "pointer" }} src={'/Admin/Icons/notifications.svg'} width={25} height={25} alt='notifications' />

        <div style={{ display: "grid", }} ref={ref} >
          <button onClick={() => { SetProB(prev => !prev) }} style={{ border: "none", background: "none" }}>
            <div style={{ backgroundColor: "#1a75e8", padding: "9.5px 14px 9px 14px", borderRadius: "100%", cursor: "pointer", width: "44.5px", height: "44px" }}>
              <h3 className={styles.logname} style={{ cursor: "pointer", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", alignContent: 'center', justifyItems: "center", fontWeight: "normal" }}>
                {avatar}
              </h3>
            </div>
          </button>
          {ProfB &&
            <div style={{ position: "absolute", zIndex: 100, top: "75px", right: "12px", width: "265px", height: role ? "265px" : "175px", backgroundColor: "#242424", border: 'solid 1px #333333' }}>
              <div style={{ display: 'flex', marginLeft: "16px", marginTop: "24px", borderBottom: "solid 2px #2d2d2d", paddingBottom: "20px", width: "210px" }}>
                <div style={{ backgroundColor: "#1a75e8", padding: "9.5px 14px 9px 14px", borderRadius: "100%", cursor: "pointer", width: "44.5px", height: "44px" }}>
                  <h3 className={styles.logname} style={{ cursor: "pointer", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", alignContent: 'center', justifyItems: "center", fontWeight: "normal" }}>
                    {avatar}
                  </h3>
                </div>
                <div style={{ display: 'grid', marginLeft: "16px", marginTop: "5px", }}>
                  <h3 style={{ fontWeight: "normal", marginBottom: "6px", color: "white" }}>{!role ? `welcome ${Name}` : Name}{role && ` - ${role}`}</h3>
                  <h4 style={{ color: "gray", fontSize: "14px", }}>{email}</h4>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', borderBottom: "solid 2px #2d2d2d", paddingBottom: "20px", width: "210px", marginLeft: "20px" }}>
                  <Link href='/' className={styles.Dashboard} style={{ border: "none", cursor: "pointer", marginTop: "24px", width: "210px", }}>
                    <span style={{ fontSize: "14px", display: "flex", alignItems: "center", marginLeft: "2px", }}><Image style={{ marginRight: "8px" }} src='/Admin/Icons/Home.svg' width={25} height={25} alt="Dashboard" />Home</span>
                  </Link>
                </div>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                  <button className={styles.logout} style={{ border: "none", cursor: "pointer", marginRight: "10px", marginTop: "12px", width: "210px", }} onClick={RemoveUser}>
                    <Image src='/help_icons/logout.svg' width={25} height={25} alt="Logout" />
                    <span style={{ fontSize: "14px", display: "flex", alignItems: "center", marginLeft: "8px" }}>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
