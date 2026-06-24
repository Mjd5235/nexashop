import React from 'react'
import styles from './Skeletons.module.css'

export default function Skeletons() {
    return (
        <div>
            <div className={styles.SkeletonCenter}>
                <div className={styles.Skeleton}>
                    <div className={styles.imageSkeleton}></div>
                    <div className={styles.detailsSkeleton}>
                        <div className={styles.TiPrSkeleton}>
                            <div className={styles.titleSkeleton}></div>
                            <div className={styles.timeSkeleton}></div>
                        </div>
                        <div className={styles.stockSkeleton}></div>
                        <div className={styles.chooseColorSk}></div>
                        <div className={styles.colorsSkeletons}>
                            <div className={styles.colorSkeleton}><div className={styles.colorCircleSk}></div></div>
                            <div className={styles.colorSkeleton}><div className={styles.colorCircleSk}></div></div>
                            <div className={styles.colorSkeleton}><div className={styles.colorCircleSk}></div></div>
                        </div>
                        <div className={styles.warrentContainer}><div className={styles.warrantySkeleton}><div className={styles.warrantyTextSk}></div></div></div>
                        <div className={styles.quanSkeleton}>
                            <div className={styles.dequanSkeleton}>
                                <div className={styles.decreaseSkeleton}></div>
                            </div>
                            <div className={styles.coquanSkeleton}>
                                <div className={styles.counterSkeleton}></div>
                            </div>
                            <div className={styles.inquanSkeleton}>
                                <div className={styles.increaseSkeleton}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pricesSkeleton}>
                        <div className={styles.propriSkeleton}></div>
                        <div className={styles.shipSkeleton}></div>
                        <div className={styles.totalSkeleton}></div>
                        <div className={styles.deleteSkeleton}><div className={styles.deleteIconSk}></div></div>
                    </div>
                </div>
            </div>
            <div className={styles.SkeletonCenter}>
                <div className={styles.SecSkeleton}>
                    <div className={styles.SecimageSkeleton}></div>
                    <div className={styles.detailsSkeleton}>
                        <div className={styles.titleSkeleton}></div>
                        <div className={styles.timeSkeleton}></div>
                        <div className={styles.stockSkeleton}></div>
                        <div className={styles.chooseColorSecSk}></div>
                        <div className={styles.colorsSkeletons}>
                            <div className={styles.colorSkeleton}><div className={styles.colorCircleSk}></div></div>
                            <div className={styles.colorSkeleton}><div className={styles.colorCircleSk}></div></div>
                            <div className={styles.colorSkeleton}><div className={styles.colorCircleSk}></div></div>
                        </div>
                        <div className={styles.warrantySkeleton}><div className={styles.warrantyTextSk}></div></div>
                        <div className={styles.quanSkeleton}>
                            <div className={styles.dequanSkeleton}>
                                <div className={styles.decreaseSkeleton}></div>
                            </div>
                            <div className={styles.coquanSkeleton}>
                                <div className={styles.counterSkeleton}></div>
                            </div>
                            <div className={styles.inquanSkeleton}>
                                <div className={styles.increaseSkeleton}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.SecpricesSkeleton}>
                        <div className={styles.propriSkeleton}></div>
                        <div className={styles.shipSkeleton}></div>
                        <div className={styles.totalSkeleton}></div>
                        <div className={styles.SecdeleteSkeleton}><div className={styles.deleteIconSk}></div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
