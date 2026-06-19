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
    { key: 5, message: "Order", continueMes: "is being delivered.", id: "#3847", time: "1h ago", Image: "/Admin/Icons/delivering.svg", state: "neutral", color: "#d97706   " },
    { key: 6, message: "Product", continueMes: "is almost sold out.", id: "#17", time: "1h ago", Image: "/Admin/Icons/aboutlow.svg", state: "neutral", color: "#d97706    " },
    { key: 7, message: "New user registered: Mohamed Khaled.", id: "", time: "2h ago", Image: "/Admin/Icons/newuserreg.svg", state: "affirmative", color: "#16a34a    " },
    { key: 8, message: "Incorrect login entries detected.", id: "", time: "2h ago", Image: "/Admin/Icons/incoentires.svg", state: "negative", color: "#dc2626  " },
  ]

  return (
    // استبدلنا الـ inline style بكلاس من الموديل لقابلية التجاوب
    <div className={styles.feedCard}>
      <span className={styles.feedHeader}>
        Activity Feed:
        <span className={styles.feedSubHeader}>Recent system activities</span>
      </span>

      <ul className={styles.feedsList}>
        {feeds.map(feed => (
          <li
            onMouseEnter={() => setEnter(feed.key)} // استخدمنا الـ key هنا أفضل وأدق للـ Hover
            onMouseLeave={() => setEnter(null)}
            className={styles.feedItem}
            key={feed.key}
            style={{
              backgroundColor: enter === feed.key ? feed.color : "transparent",
              color: enter === feed.key ? "#ffffff" : "#1a1a1a" // يقلب الخط أبيض لو الخلفية تغمقت عشان التباين
            }}
          >
            <div className={styles.imgmes}>
              <Image
                className={styles.feedImage}
                src={feed.Image}
                width={35}
                height={35}
                alt={""}
                style={{
                  backgroundColor: feed.state === "affirmative" ? "#22c55e" : feed.state === "neutral" ? "#f59e0b" : "#ef4444",
                }}
              />
              <div className={styles.messageContent}>
                {feed.message}
                {feed.id && <span className={styles.ID}> {feed.id}</span>}
                {feed.continueMes && <span> {feed.continueMes}</span>}
              </div>
            </div>
            <div
              className={styles.time}
              style={{ color: enter === feed.key ? "#ffffff" : "gray" }}
            >
              {feed.time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityFeed