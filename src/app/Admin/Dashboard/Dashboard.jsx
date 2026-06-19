"use client"
import React, { useState } from 'react'
import Statistics from '../components/Statistics/Statistics';
import Charts from '../components/Charts/Charts';
import PieChart from '../components/PieChart/PieChart';
import LastOrders from '../components/LastOrders/LastOrders';
import TopPro from '../components/TopPro/TopPro';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Image from 'next/image';
import styles from './page.module.css'

export default function Dashboard() {

    const [sided, setSided] = useState(true)

    const SideB = () => {
        setSided(!sided)
    }

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.mainFlexContainer}>

                <div className={sided ? styles.sidebarHidden : styles.sidebarWrapper} style={{ display: sided ? "flex" : "none" }}>
                    <Sidebar height="3500px" font="Dashboard" />
                </div>

                <Image
                    className={styles.menuIcon}
                    src={'/Admin/Icons/menu.svg'}
                    width={35}
                    height={35}
                    alt='menu'
                    onClick={SideB}
                />

                <div className={styles.contentContainer}>
                    <Header />
                    <div>
                        <div className={styles.dashboardTitle}>Dashboard</div>

                        <Statistics />

                        <div className={styles.chartsSection}>
                            <Charts />
                            <PieChart />
                        </div>

                        <div className={styles.bottomSection}>
                            <div className={styles.ordersGrid}>
                                <LastOrders />
                                <TopPro />
                            </div>
                            <ActivityFeed />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}