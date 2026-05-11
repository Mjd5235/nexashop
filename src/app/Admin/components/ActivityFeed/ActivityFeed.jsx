"use client"
import React, { useState } from 'react'
import styles from './Activity.module.css'
import Image from 'next/image'

const ActivityFeed = () => {

  const [enter, setEnter] = useState(null)

  const feeds = [
    { key: 1, message: "Order", continueMes: "checked out successfully.", id: "#3849", time: "5m ago", Image: "/Admin/Icons/checkout.svg", state: "affirmative", color: "#16a34a " },
    { key: 2, message: "Product", continueMes: "restocked.", id: "#17", time: "7m ago", Image: "/Admin/Icons/restocked.svg", state: "affirmative", color: "#16a34a  " },
    { key: 3, message: "Payment is incomplete.", id: "", time: "15m ago", Image: "/Admin/Icons/incompay.svg", state: "neutral", color: "#d97706 " },
    { key: 4, message: "Product", continueMes: "is running low on stock.", id: "#15", time: "29m ago", Image: "/Admin/Icons/lowstock.svg", state: "negative", color: "#dc2626 " },
    { key: 5, message: "Order", continueMes: "is being delivered.", id: "#3847", time: "1h ago", Image: "/Admin/Icons/delivering.svg", state: "neutral", color: "#d97706  " },
    { key: 6, message: "Product", continueMes: "is almost sold out.", id: "#17", time: "1h ago", Image: "/Admin/Icons/aboutlow.svg", state: "neutral", color: "#d97706   " },
    { key: 7, message: "New user registered: Mohamed Khaled.", id: "", time: "2h ago", Image: "/Admin/Icons/newuserreg.svg", state: "affirmative", color: "#16a34a   " },
    { key: 8, message: "Incorrect login entries detected.", id: "", time: "2h ago", Image: "/Admin/Icons/incoentires.svg", state: "negative", color: "#dc2626  " },
  ]

  return (
    <div style={{ backgroundColor: "white", boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", width: "450px", height: "900px", marginTop: "40px", marginLeft: "36px", borderRadius: "16px" }}>
      <span style={{ color: "#1a1a1a", display: 'grid', paddingTop: "30px", paddingLeft: "50px", fontSize: "20px", fontWeight: "bold", borderBottom: "solid 1px #dddddd", paddingBottom: "25px", color: "#1a1a1a" }}>Activity Feed: <span style={{ color: "gray", marginTop: "8px", fontSize: "13px", fontWeight: "normal", }}>Recent system activities</span></span>
      <ul className={styles.feeds}>
        {feeds.map(feed => (
          <li onMouseEnter={() => setEnter(feed.color)} onMouseLeave={() => setEnter(null)} className={styles.feed} key={feed.key} style={{ backgroundColor: enter === feed.color && enter, borderRadius: "8px", paddingTop: "8px", paddingBottom: "8px", }}>
            <div className={styles.imgmes}><Image className={styles.Image} src={feed.Image} width={35} height={35} alt={""} style={{ backgroundColor: feed.state === "affirmative" && "#22c55e" || feed.state === "neutral" && "#f59e0b" || feed.state === "negative" && "#ef4444", padding: "5px", marginTop: "-8px", marginRight: "11px", borderRadius: "8px" }} />
              <div style={{ display: 'flex' }}>{feed.message}<div className={styles.ID}>{feed.id}</div>{feed.continueMes ? <div> {feed.continueMes}</div> : null}</div>
            </div>
            <div className={styles.time} style={{ color: enter === feed.color ? "#1a1a1a" : "gray" }}>{feed.time}</div>
          </li>
        ))}

      </ul>
    </div>
  )
}
export default ActivityFeed