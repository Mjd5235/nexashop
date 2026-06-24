"use client"
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
          console.error(error)
        }
      }
    }
    GetUsers()
  }, [])

  return (
    <div className={styles.sidebarContainer} style={{ height: height }}>
      <div className={styles.profileSection}>
        <h3 className={styles.welcomeText}>
          Welcome
          <span className={styles.nameHighlight}>&nbsp;{Name}</span>
        </h3>
        <span className={styles.roleText}>Author</span>
      </div>

      <div className={styles.linksContainer}>
        {sideData.map((img) => (
          <Link
            href={img.url}
            scroll={true}
            key={img.id}
            className={`${styles.linkItem} ${img.name === font ? styles.linkItemActive : ''}`}
          >
            <div key={img.id} className={styles.linkContent}>
              <Image
                className={styles.linkIcon}
                src={img.image}
                alt={img.name}
                width={20}
                height={20}
                title={img.name}
              />
              <span
                className={`${styles.link} ${styles.linkText}`}
                style={{
                  fontWeight: img.name === font ? "bold" : 'normal',
                  fontSize: img.name === font ? "18px" : "",
                  color: img.name === font ? "#fff" : "#fff"
                }}
              >
                {img.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </ div >
  )
}