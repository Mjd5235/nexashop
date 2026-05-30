"use client"
import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import Link from 'next/link';
import { supabase } from '@/lib/SubaBaseClient';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';

const Orders = () => {
    const orders = [
        {
            id: 'NEXA-772190',
            date: 'May 24, 2026',
            status: 'Shipped',
            steps: [
                { label: 'Confirmed', status: 'done', icon: '✓' },
                { label: 'Processing', status: 'done', icon: '✓' },
                { label: 'Shipped', status: 'current', icon: '🚚' },
                { label: 'Delivered', status: 'pending', icon: '🏠' },
            ],
            products: [
                { id: 1, name: 'Nike Air Max 270', variant: 'Size: 42 · Color: Black/Blue', qty: 1, price: '$159.00', icon: '👟' },
                { id: 2, name: 'Premium Cotton T-Shirt', variant: 'Size: L · Color: White', qty: 2, price: '$80.00', icon: '👕' },
            ],
            total: '$599.00'
        },
        {
            id: 'NEXA-768441',
            date: 'May 20, 2026',
            status: 'Confirmed',
            steps: [
                { label: 'Confirmed', status: 'current', icon: '✓' },
                { label: 'Processing', status: 'pending', icon: '⚙️' },
                { label: 'Shipped', status: 'pending', icon: '🚚' },
                { label: 'Delivered', status: 'pending', icon: '🏠' },
            ],
            products: [
                { id: 3, name: 'MacBook Pro 14" M3', variant: 'Space Gray · 512GB SSD', qty: 1, price: '$1,999.00', icon: '💻' },
            ],
            total: '$1,999.00'
        }
    ];

    const filteringTabs = [
        { id: 1, title: "All Orders" },
        { id: 2, title: "Confirmed" },
        { id: 3, title: "Shipped" },
        { id: 4, title: "Delivered" },
    ]

    const [filterChoosed, setFilterChoosed] = useState(1)

    const [data6, setData6] = useState()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                const { data: orders, error } = await supabase.from("orders").select("*").eq("user_id", data.user.id).order("created_at", { ascending: false })
                if (error) {
                    alert(error.message)
                } else {
                    setData6(orders)

                }
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (data6 && data6.length > 0) {
            console.log(data6)
        }
    }, [data6])

    return (
        <div className={styles.OrdersBodyBg}>
            <Header />

            <div className={styles.container}>
                {/* HEADER */}
                <header className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <h1>My Orders</h1>
                        <p>Detailed view of your purchase status and items</p>
                    </div>
                    <Link href={'/'} className={styles.continueBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Continue Shopping
                    </Link>
                </header>

                {/* FILTER TABS */}
                <div className={styles.filterTabsContainer}>
                    <div className={styles.filterTabs}>
                        {filteringTabs.map(item => (
                            <button key={item.id} onClick={() => setFilterChoosed(item.id)} className={`${styles.tab} ${item.id === filterChoosed && styles.tabActive}`}>{item.title}</button>
                        ))}

                    </div>
                </div>
                {/* ORDERS LIST */}
                <div className={styles.ordersList}>
                    {data6 && data6.length > 0 ? data6.map((order, index) => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.orderMeta}>
                                    <span className={styles.orderNumber}>{`#NEXA-${order.id.slice(0, 6).toUpperCase()}`}</span>
                                    <span className={styles.orderDate}>{new Date(order.created_at).toLocaleDateString("US-en", { year: "numeric", month: "short", day: "numeric" })}</span>
                                </div>
                                <span className={`${styles.badge} ${order.status === 'Shipped' ? styles.badgeShipped : styles.badgeConfirmed}`}>
                                    <span className={styles.badgeDot}></span>
                                    {order.status}
                                </span>
                            </div>

                            {/* PROGRESS TRACKER */}
                            <div className={styles.progressTracker}>
                                <div className={styles.progressSteps}>

                                    <div key={index} className={styles.step}>

                                        <div className={`${styles.stepLine} ${order.status === 'done' ? styles.stepLineDone : ''}`}></div>

                                        <div className={`${styles.stepCircle} ${order.status === 'done' ? styles.stepCircleDone : order.status === 'current' ? styles.stepCircleCurrent : ''}`}>

                                        </div>
                                        <span className={`${styles.stepLabel} ${order.status === 'done' ? styles.stepLabelDone : order.status === 'current' ? styles.stepLabelCurrent : ''}`}>

                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* PRODUCT LIST */}
                            <div className={styles.productList}>
                                {order.cart_items.map(item => (
                                    <div key={item.product_id} className={styles.productItem}>
                                        <div className={styles.imageContainer}><Image src={item.image} fill className={styles.productImgBox} alt={item.title} /></div>
                                        <div className={styles.productDetails}>
                                            <div className={styles.productName}>{item.title}</div>
                                            <div className={styles.productVariant}></div>
                                        </div>
                                        <div className={styles.productQtyPrice}>
                                            <div className={styles.productQty}>Qty: {item.quantity}</div>
                                            <div className={styles.productPrice}>{item.price}</div>
                                        </div>
                                    </div>
                                ))

                                }
                            </div>



                            {/* FOOTER */}
                            <div className={styles.cardFooter}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalAmount}>{order.total_price} SAR</span>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Orders;