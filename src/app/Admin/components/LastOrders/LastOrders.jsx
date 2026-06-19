"use client";

import React from 'react';
import styles from './lastorders.module.css';

export default function RecentOrders() {
    const Data = [
        {
            id: "#3847",
            customer: "John Smith",
            product: "iPhone 15 Pro Max",
            amount: "4,699.99 SAR",
            status: "completed",
            date: "2026-01-15"
        },
        {
            id: "#3848",
            customer: "Sarah Johnson",
            product: "Folding Smartphone",
            amount: "5,249.99 SAR",
            status: "pending",
            date: "2026-01-14"
        },
        {
            id: "#3849",
            customer: "Mike Wilson",
            product: "Black Gaming Laptop",
            amount: "3,749.99 SAR",
            status: "cancelled",
            date: "2026-01-14"
        },
        {
            id: "#3850",
            customer: "Emily Davis",
            product: "Apple Watch",
            amount: "999.99 SAR",
            status: "completed",
            date: "2026-01-14"
        },
    ];

    const getStatusClass = (status) => {
        if (status === "completed") return styles.statusCompleted;
        if (status === "pending") return styles.statusPending;
        if (status === "cancelled") return styles.statusCancelled;
        return "";
    };

    return (
        <div className={styles.cardContainer}>
            <div className={styles.headerSection}>
                <div className={styles.titleWrapper}>
                    Recent orders
                    <span className={styles.subtitle}>Latest customer orders</span>
                </div>
            </div>

            <div className={styles.tableResponsive}>
                <table className={styles.ordersTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map(order => (
                            <tr key={order.id} className={styles.orderRow}>
                                <td className={styles.orderId}>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.product}</td>
                                <td className={styles.amount}>{order.amount}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
