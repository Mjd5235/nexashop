import React from 'react'
import styles from './Products.module.css'

export default function ProductsSkeleton() {

    const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]
    return (
        <div id="products" className={styles.proarea}>
            <div className={styles.productsWrapper}>
                <ul
                    className={`${styles.skeletons} ${styles.productsList}`}
                    style={{ overflowX: "hidden" }}
                >
                    {data.map(img => (
                        <li key={img.id} className={styles.skeletonCard}>
                            <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>

                            <div className={`${styles.skeleton} ${styles.skeletonName}`}></div>

                            <div className={styles.skeletonDescription}>
                                <div className={`${styles.skeleton} ${styles.skeletonLine100}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonLine90}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonLine85}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonLine80}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonLine75}`}></div>
                            </div>

                            <div className={styles.skeletonPriceArea}>
                                <div className={`${styles.skeleton} ${styles.skeletonPrice1}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonPrice2}`}></div>
                            </div>

                            <div className={`${styles.skeleton} ${styles.skeletonStock}`}></div>

                            <div className={`${styles.skeleton} ${styles.skeletonDelivery}`}></div>

                            <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
                        </li>
                    ))}
                </ul>
            </div >
        </div>
    )
}
