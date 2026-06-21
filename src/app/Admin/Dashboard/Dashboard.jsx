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

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
        setSided(!sided)
    }

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.sidebarWrapper}>
                <Sidebar height="100%" font="Dashboard" />
            </div>

            <div className={`${styles.sidebarMobileDrawer} ${isMobileSidebarOpen ? styles.open : ''}`}>
                <Sidebar height="100%" font="Dashboard" />
            </div>

            <div className={`${styles.sidebarOverlay} ${isMobileSidebarOpen ? styles.active : ''}`} onClick={() => { toggleMobileSidebar() }}></div>

            <div className={styles.mainFlexContainer}>
                <Image
                    className={styles.menuIcon}
                    src={'/Admin/Icons/menu.svg'}
                    width={35}
                    height={35}
                    alt='menu'
                    onClick={() => { toggleMobileSidebar() }}
                />

                <div className={styles.contentContainer}>
                    <Header />
                    <div className={styles.mainContent}>
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