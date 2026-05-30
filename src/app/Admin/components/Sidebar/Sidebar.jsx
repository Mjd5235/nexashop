import React, { useState, useEffect } from 'react'
import { sideData } from './data'
import Link from 'next/link'
import Image from 'next/image'
import styles from './side.module.css'
import { supabase } from '@/lib/SubaBaseClient'

export default function Sidebar({ height, font }) {

  const [Name, setName] = useState(null)

  useEffect(() => {
    const GetUsers = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        setName(data.user.user_metadata.name)
        if (error) {
          console.log(error.message)
        }
      }
    }
    GetUsers()
  }, [])

  return (
    <div style={{ height: height, backgroundColor: "#1a1a1a", paddingTop: "32px" }}>
      <div style={{ display: "grid", justifyContent: "center", alignContent: 'center', alignItems: "center", marginTop: "25px", paddingBottom: "20px", borderBottom: "solid 1px gray", width: "200px", marginLeft: "25px" }}>
        <h3 style={{ display: "flex", color: "white", }}>Welcome<span style={{ display: "flex", color: "#1a75e8", fontSize: "20px" }}>&nbsp;{Name}</span></h3>
        <span style={{ color: "#adabab", display: "grid", marginLeft: "40px", marginTop: "7px", fontSize: "14px" }}>Author</span>
      </div>

      <div style={{ marginTop: "32px", marginLeft: "25px", }}>
        {sideData.map((img) => (
          <div key={img.id} style={{ display: "flex", marginTop: "45px", }}><Image style={{ marginRight: "10px", marginBottom: "-4px" }} src={img.image} alt={img.name} width={20} height={20} /><Link href={img.url} key={img.id} style={{ color: "white", }}><span className={styles.link} style={{ display: "flex", fontWeight: img.name === font ? "bold" : 'normal', fontSize: img.name === font ? "18px" : "", color: img.name === font ? "#1a90e8" : "#fff", }}>{img.name}</span></Link></div>
        ))}
      </div>
    </div>
  )
}
