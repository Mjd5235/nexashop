"use client";

import React from 'react';
import Image from 'next/image';
import styles from './TopProducts.module.css';

export default function TopPro() {
    const Data = [
        { id: 1, name: "iPhone 15 Pro Max", revenue: "2,987,530 SAR", sales: "139", per: "12%", categ: "Phones", space: "-20px" },
        { id: 2, name: "Macbook Pro M1", revenue: "2,562,044 SAR", sales: "125", per: "8%", categ: "Computers", space: "-15px" },
        { id: 3, name: "iPad Pro with Keyboard Case", revenue: "1,953,229 SAR", sales: "109", per: "7%", categ: "Tablets", space: "-103px" },
    ];

    return (
        <div className={styles.cardContainer}>
            <span className={styles.titleWrapper}>
                Top Products:
                <span className={styles.subtitle}>Best performing products</span>
            </span>
            <div className={styles.listContainer}>
                <div className={styles.productsGrid}>
                    {Data.map(product => (
                        <div key={product.id} className={styles.productItem}>
                            <span className={styles.productMainInfo}>
                                {product.name}
                                <span className={styles.salesText}>{product.sales} sales</span>
                            </span>
                            <span
                                className={styles.productMetrics}
                                style={{ marginLeft: product.space }}
                            >
                                {product.revenue}
                                <span className={styles.trendText}>
                                    <Image
                                        className={styles.trendIcon}
                                        src={'/Admin/Icons/up.svg'}
                                        width={30}
                                        height={30}
                                        alt='trend'
                                    />
                                    +{product.per}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
