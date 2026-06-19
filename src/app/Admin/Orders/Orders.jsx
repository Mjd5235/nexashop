"use client"
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Image from 'next/image';
import styles from './Orders.module.css';
import CustomSelect from './customSelect';
import { supabase } from '@/lib/SubaBaseClient';

const Orders = () => {

    const [sided, setSided] = useState(true)
    const [data1, setData1] = useState(null)
    const [OrderStatus, setOrderStatus] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    const [ordersCounter, setOrdersCounter] = useState(null)
    const [pendingCounter, setPendingCounter] = useState(null)
    const [completedCounter, setCompletedCounter] = useState(null)
    const [Loading, setLoading] = useState(true)

    const orderStatuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

    const SideB = () => {
        { sided === true ? setSided(false) : setSided(true) }
    }

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
            setData1(filterStatus !== "All Statuses" ? data.filter(item => item.status === filterStatus) : data)
            setOrdersCounter(data.length)
            setPendingCounter(data.filter(item => item.status !== "Delivered").length)
            setCompletedCounter(data.filter(item => item.status === "Delivered").length)
            setLoading(false)
        }
        getData()
    }, [filterStatus])

    const handleSearch = async (value) => {
        const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
        console.log(value)
        if (value === "") {
            setData1(data)
        } else {
            setData1(data.filter(item => item.id.toLowerCase().includes(value.toLowerCase())))
        }
    }


    const handleStatusUpdate = async (value, ID) => {
        const { error } = await supabase.from("orders").update({ status: value }).eq("id", ID)
        if (error) { console.log(error.message) } else {
            const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
            setData1(filterStatus !== "All Statuses" ? orders.filter(item => item.status === filterStatus) : orders)
            setOrdersCounter(orders.length)
            setPendingCounter(orders.filter(item => item.status !== "Delivered").length)
            setCompletedCounter(orders.filter(item => item.status === "Delivered").length)
        }
    }

    return (
        <div className={styles.OrdersBg}>
            <div style={{ display: "grid" }}>
                <div style={{ display: "flex" }}>
                    {sided ?
                        <div style={{ width: "250px", }}>
                            <Sidebar height="2000px" font="Orders" />
                        </div>
                        : null}
                    <Image style={{ display: 'flex', marginTop: "20px", position: "absolute", marginLeft: sided ? "300px" : "100px", cursor: "pointer", }} src={'/Admin/Icons/menu.svg'} width={35} height={35} alt='menu' onClick={SideB} />
                    <div style={{ width: sided ? "1655px" : "1920px", marginLeft: sided ? "250px" : "0", marginLeft: sided ? "0px" : "", }}>
                        <Header />

                        <div className={styles.AlignmentCon}>
                            <div className={styles.container}>
                                <div className={styles.headerSection}>
                                    <h1 className={styles.title}>Orders</h1>

                                    <div className={styles.summaryCards}>
                                        <div className={styles.summaryCard}>
                                            <div className={styles.summaryLabel} style={{ marginTop: Loading === true && "-12px" }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                Total Orders
                                            </div>
                                            <div className={`${styles.summaryValue} ${styles.summaryValueBlue}`}>{ordersCounter}</div>
                                        </div>
                                        <div className={styles.summaryCard}>
                                            <div className={styles.summaryLabel} style={{ marginTop: Loading === true && "-12px" }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                Pending
                                            </div>
                                            <div className={`${styles.summaryValue} ${styles.summaryValueOrange}`}>{pendingCounter}</div>
                                        </div>
                                        <div className={styles.summaryCard}>
                                            <div className={styles.summaryLabel} style={{ marginTop: Loading === true && "-12px" }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                                Completed
                                            </div>
                                            <div className={`${styles.summaryValue} ${styles.summaryValueGreen}`}>{completedCounter}</div>
                                        </div>
                                    </div>

                                    <div className={styles.controlsBar}>
                                        <div className={styles.searchWrapper}>
                                            <svg className={styles.searchIcon} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            <input type="text" onChange={(e) => handleSearch(e.target.value)} className={styles.searchInput} placeholder="Search by order ID" />
                                        </div>
                                        <CustomSelect
                                            options={["All Statuses", ...orderStatuses]}
                                            defaultValue={filterStatus}
                                            onChange={setFilterStatus}

                                        />
                                    </div>
                                </div>
                                <div className={styles.cardCon}>
                                    <div className={styles.card}>
                                        <div className={styles.tableHeader}>
                                            <div>Order ID</div>
                                            <div>Customer</div>
                                            <div>Date</div>
                                            <div>Status</div>
                                            <div>Action</div>
                                        </div>
                                        {data1 && data1.length > 0 ? data1.map(item => (
                                            <div key={item.id} className={styles.orderRow}>

                                                <div className={styles.colId}>{`#NEXA-${item.id.slice(0, 6).toUpperCase()}`}</div>
                                                <div>
                                                    <div className={styles.avatar}>{item.user_avatar}</div>
                                                    <span className={styles.customerEmail}>{item.user_email}</span>
                                                </div>
                                                <div className={styles.colDate}>{new Date(item.created_at).toLocaleDateString("US-en", { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                                <div>
                                                    <span className={`${styles.statusBadge} ${item.status.toUpperCase() === 'DELIVERED' ? styles.badgeConfirmed : item.status.toUpperCase() === 'CONFIRMED' ? styles.badgeShipped : styles.statusProcessing}`}>{item.status}</span>
                                                </div>
                                                <div>
                                                    <CustomSelect
                                                        options={orderStatuses}
                                                        defaultValue={item.status}
                                                        onChange={(value) => { handleStatusUpdate(value, item.id) }}
                                                    />
                                                </div>
                                            </div>
                                        )) : <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
                                            {Loading === false ? "No orders found." : "Loading the orders..."}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;