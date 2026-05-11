import React from 'react'
import styles from '../../Dashboard/page.module.css'
import Image from 'next/image'

export default function Statistics() {
  return (
    <div style={{ display: "flex", width: "1058px", marginLeft: "120px", marginTop: "50px", }}>

      <div className={styles.product} style={{ width: "320px" }}>
        <h4 style={{ marginBottom: "20px", marginLeft: "50px", marginTop: "-10px" }}>
          Total Revenue
          <Image style={{ marginBottom: "-10px", backgroundColor: "#1a75e8", borderRadius: "3px", marginLeft: "30px", padding: "5px" }} src={'/Admin/Icons/revenue.svg'} width={35} height={35} alt='user' />
        </h4>
        <h1 style={{ marginBottom: "20px", display: "flex", fontSize: "34px", justifyContent: "center", alignContent: "center", alignItems: "center", display: "flex", color: "#1a1a1a", }}>
          <Image style={{ marginBottom: "-5px", marginRight: "8px", }} src={'/Admin/Icons/up.svg'} width={40} height={40} alt='user' />
          124,563$
        </h1>
        <div style={{ display: 'flex', justifyContent: "center", alignContent: 'center', alignItems: "center", color: "#adabab" }}>
          <span style={{ display: "flex" }}>
            <span style={{ fontWeight: "bold", color: "#22C55E", marginRight: "4px" }}>+12% </span>
            vs last month
          </span>
        </div>
      </div>

      <div className={styles.product} style={{ width: "320px" }}>
        <h4 style={{ marginBottom: "20px", marginLeft: "50px" }}>
          Active Users
          <Image style={{ marginBottom: "-10px", marginTop: "-10px", backgroundColor: "#1a75e8", borderRadius: "3px", marginLeft: "30px", padding: "5px" }} src={'/Admin/Icons/users2.svg'} width={35} height={35} alt='user' />
          <div style={{ display: 'flex' }}></div></h4><h1 style={{ marginBottom: "20px", fontSize: "34px", justifyContent: "center", alignContent: "center", alignItems: "center", display: "flex", color: "#1a1a1a", fontWeight: "bold" }}>
          <Image style={{ marginBottom: "-8px", marginRight: "8px", }} src={'/Admin/Icons/up.svg'} width={40} height={40} alt='user' />
          8,549
        </h1>
        <div style={{ display: 'flex', justifyContent: "center", alignContent: 'center', alignItems: "center" }}>
          <span style={{ display: 'flex', color: "#adabab" }}> <span style={{ color: "#22C55E", marginRight: "3px", fontWeight: "bold", }}>+8.2%</span>
            vs last month</span>
        </div>
      </div>

      <div className={styles.product} style={{ width: "320px" }}>
        <h4 style={{ marginBottom: "20px", marginLeft: "50px" }}>
          Total Orders
          <Image style={{ marginTop: "-10px", marginBottom: "-10px", backgroundColor: "#1a75e8", borderRadius: "3px", marginLeft: "30px", padding: "5px" }} src={'/Admin/Icons/orders.svg'} width={35} height={35} alt='user' />
        </h4><h1 style={{ marginBottom: "20px", fontSize: "34px", justifyContent: "center", alignContent: "center", alignItems: "center", display: "flex", color: "#1a1a1a", fontWeight: "bold" }}>
          <Image style={{ marginBottom: "-8px", marginRight: "8px", }} src={'/Admin/Icons/up.svg'} width={40} height={40} alt='user' />
          2,847
        </h1>
        <div style={{ display: 'flex', justifyContent: "center", alignContent: 'center', alignItems: "center" }}>
          <span style={{ display: "flex", color: "#adabab" }}>
            <span style={{ color: "#22C55E", marginRight: "3px", fontWeight: "bold", }}>+15.3%</span>
            vs last month</span>
        </div>
      </div>

      <div className={styles.product} style={{ width: "320px" }}>
        <h4 style={{ marginBottom: "20px", marginLeft: "50px" }}>
          Page Views
          <Image style={{ marginTop: "-10px", marginBottom: "-10px", backgroundColor: "#1a75e8", borderRadius: "3px", marginLeft: "30px", padding: "5px" }} src={'/Admin/Icons/views.svg'} width={35} height={35} alt='user' />
        </h4>
        <h1 style={{ marginBottom: "20px", fontSize: "34px", justifyContent: "center", alignContent: "center", alignItems: "center", display: "flex", color: "#1a1a1a", fontWeight: "bold" }}>
          <Image style={{ marginBottom: "-8px", marginRight: "8px", }} src={'/Admin/Icons/down.svg'} width={40} height={40} alt='user' />
          45,892
        </h1>
        <div style={{ display: 'flex', justifyContent: "center", alignContent: 'center', alignItems: "center" }}>
          <span style={{ display: "flex", color: "#adabab" }}>
            <span style={{ color: "red", marginRight: "3px", fontWeight: "bold", }}>-2.1% </span>
            vs last month</span>
        </div>
      </div>

    </div>
  )
}
