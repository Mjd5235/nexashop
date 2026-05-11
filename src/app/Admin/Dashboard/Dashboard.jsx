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

export default function Dashboard() {

    const [sided, setSided] = useState(true)

    const SideB = () => {
        { sided === true ? setSided(false) : setSided(true) }
    }

    return (
        <div style={{ display: "grid" }}>
            <div style={{ display: "flex" }}>
                {sided ?
                    <div style={{ width: "250px", }}>
                        <Sidebar height="2000px" font="Dashboard" />
                    </div>
                    : null}
                <Image style={{ display: 'flex', marginTop: "20px", position: "absolute", marginLeft: sided ? "300px" : "100px", cursor: "pointer", }} src={'/Admin/Icons/menu.svg'} width={35} height={35} alt='menu' onClick={SideB} />
                <div style={{ width: sided ? "1655px" : "1920px", marginLeft: sided ? "250px" : "0", marginLeft: sided ? "0px" : "", }}>
                    <Header />
                    <div style={{ marginTop: "30px", fontWeight: "bold", marginLeft: "150px", background: "linear-gradient(120deg, #1a75e8, #3463a1)", fontWeight: "700", fontSize: "32px", letterSpacing: "0.5px", backgroundClip: "text", color: "transparent" }}>Dashboard</div>
                    <Statistics />
                    <div style={{ display: "flex" }}>
                        <Charts />
                        <PieChart />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: "grid" }}>
                            <LastOrders />
                            <TopPro />
                        </div>
                        <ActivityFeed />
                    </div>
                </div>
            </div>
        </div>
    )
}
