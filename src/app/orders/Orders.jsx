"use client"
import React, { useEffect, useState, useMemo } from 'react';
import styles from './Orders.module.css';
import Link from 'next/link';
import { supabase } from '@/lib/SubaBaseClient';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import toast from 'react-hot-toast';


const Icons = {
    Confirmed: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ),
    Processing: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
        </svg>
    ),
    Shipped: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
    ),
    Delivered: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    )
};

const Orders = () => {
    const [filterChoosed, setFilterChoosed] = useState(1);
    const [data6, setData6] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filteringTabs = [
        { id: 1, title: "All Orders", key: "ALL" },
        { id: 2, title: "Confirmed", key: "CONFIRMED" },
        { id: 3, title: "Processing", key: "PROCESSING" },
        { id: 4, title: "Shipped", key: "SHIPPED" },
        { id: 5, title: "Delivered", key: "DELIVERED" },
    ];

    const statusSteps = [
        { key: 'CONFIRMED', label: 'Confirmed', icon: <Icons.Confirmed /> },
        { key: 'PROCESSING', label: 'Processing', icon: <Icons.Processing /> },
        { key: 'SHIPPED', label: 'Shipped', icon: <Icons.Shipped /> },
        { key: 'DELIVERED', label: 'Delivered', icon: <Icons.Delivered /> }
    ];

    const getStepStatus = (currentStatus, stepKey) => {
        const statusOrder = ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
        const currentIndex = statusOrder.indexOf(currentStatus.toUpperCase());
        const stepIndex = statusOrder.indexOf(stepKey);

        if (stepIndex < currentIndex) return 'done';
        if (stepIndex === currentIndex) return 'current';
        return 'pending';
    };

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const { data: userData } = await supabase.auth.getUser();
            if (userData.user) {
                const { data: orders, error } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", userData.user.id)
                    .order("created_at", { ascending: false });

                if (error) {
                    toast.error("Failed to load your orders.")
                    console.error(error);
                } else {
                    setData6(orders);
                }
            }
            setIsLoading(false);
        };
        getData();
    }, []);

    const filteredOrders = useMemo(() => {
        const activeTab = filteringTabs.find(tab => tab.id === filterChoosed);
        if (!activeTab || activeTab.key === "ALL") {
            return data6;
        }
        return data6.filter(order => order.status.toUpperCase() === activeTab.key);
    }, [data6, filterChoosed]);

    return (
        <div className={styles.OrdersBodyBg}>
            <Header router='orders' />

            <div className={styles.container}>

                <header className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <h1>My Orders</h1>
                        <p>Detailed view of your purchase status and items</p>
                    </div>
                    <Link href={'/'} className={styles.continueBtn}>
                        <svg className={styles.iconShrink} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Continue Shopping
                    </Link>
                </header>

                <div className={styles.filterTabsContainer}>
                    <div className={styles.filterTabs}>
                        {filteringTabs.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setFilterChoosed(item.id)}
                                className={`${styles.tab} ${item.id === filterChoosed ? styles.tabActive : ''}`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.ordersList}>
                    {isLoading ? (
                        <div className={styles.ordersLoading}>
                            Loading your orders...
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div key={order.id} className={styles.orderCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.orderMeta}>
                                        <span className={styles.orderNumber}>{`#NEXA-${order.id.slice(0, 6).toUpperCase()}`}</span>
                                        <span className={styles.orderDate}>{new Date(order.created_at).toLocaleDateString("US-en", { year: "numeric", month: "short", day: "numeric" })}</span>
                                    </div>
                                    <span className={`${styles.badge} ${order.status.toUpperCase() === 'DELIVERED' ? styles.badgeConfirmed : order.status.toUpperCase() === 'CONFIRMED' ? styles.badgeShipped : styles.statusProcessing}`}>
                                        <span className={styles.badgeDot}></span>
                                        {order.status}
                                    </span>
                                </div>

                                <div className={styles.progressTracker}>
                                    <div className={styles.progressSteps}>
                                        {statusSteps.map((step) => {
                                            const stepStatus = getStepStatus(order.status, step.key);
                                            return (
                                                <div key={step.key} className={styles.step}>

                                                    <div className={`${styles.stepLine} ${stepStatus === 'done' || (stepStatus === 'current') ? styles.stepLineDone : ''}`}></div>

                                                    <div className={`${styles.stepCircle} ${stepStatus === 'done' ? styles.stepCircleDone : stepStatus === 'current' ? styles.stepCircleCurrent : ''}`}>
                                                        {stepStatus === 'done' ? <Icons.Confirmed /> : step.icon}
                                                    </div>
                                                    <span className={`${styles.stepLabel} ${stepStatus !== 'pending' ? styles.stepLabelDone : ''}`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={styles.productList}>
                                    {order.cart_items?.map((item, idx) => (
                                        <div key={idx} className={styles.productItem}>
                                            <div className={styles.imageContainer}>
                                                <Image src={item.image} fill className={styles.productImgBox} alt={item.title} />
                                            </div>
                                            <div className={styles.productDetails}>
                                                <div className={styles.productName}>{item.title}</div>
                                                <div className={styles.productVariant}>{item.category}</div>
                                            </div>
                                            <div className={styles.productQtyPrice}>
                                                <div className={styles.productQty}>Qty: {item.quantity}</div>
                                                <div className={styles.productPrice}>{item.price} SAR</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.cardFooter}>
                                    <span className={styles.totalLabel}>Total</span>
                                    <span className={styles.totalAmount}>{order.total_price} SAR</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.ordersLoading}>
                            No orders found.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Orders;