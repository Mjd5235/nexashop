"use client"
import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Image from 'next/image';
import { supabase } from "@/lib/SubaBaseClient";
import styles from './Products.module.css'
import Link from 'next/link';
import { Inter } from 'next/font/google';
import toast from 'react-hot-toast';
import { productTypes } from '@/types/types';

const InterSans = Inter({
    subsets: ["latin"],
    weight: ["500"]
})

export default function Products() {

    const [sided, setSided] = useState<boolean>(true)
    const [LogBut, setLogBut] = useState<boolean>(false)
    const [Sort, setSorted] = useState<string>("latest")
    const [reversed, setReversed] = useState<boolean>(true)
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false)
    const [productToDelete, setProductToDelete] = useState<string | null | number>(null)

    const ref = useRef<HTMLDivElement>(null)

    const sortData = [
        { id: 1, name: "latest", },
        { id: 2, name: "stock", },
        { id: 3, name: "price", },
    ]

    const [data1, setData1] = useState<productTypes[]>([])

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order(Sort === "stock" ? "stock" : Sort === "main" ? "id" : Sort === "price" ? "price" : Sort === "latest" ? "created_at" : "", { ascending: reversed !== true ? true : false })

            if (error) {
                toast.error("Failed to load the product.", { id: "fload" })
                console.error(error)
            } else {
                setData1(data)
            }
        }

        getData()
    }, [Sort, reversed])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setLogBut(false);
            }
        };
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    const DeleteFromData = async () => {
        if (deleteConfirmed === true) {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", productToDelete)

            if (error) {
                toast.error("Failed to delete the product.", { id: "fdelete" })
                console.error(error)
            } else {
                setData1(prev => prev.filter(product => (product).id !== productToDelete))
            }
            setShowConfirm(false)
        }
    }

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
        setSided(!sided)
    }

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.sidebarWrapper}>
                <Sidebar height="100%" font="Products" />
            </div>

            <div className={`${styles.sidebarMobileDrawer} ${isMobileSidebarOpen ? styles.open : ''}`}>
                <Sidebar height="100%" font="Products" />
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
                    <div>
                        <div className={styles.topActionsSection}>
                            <div className={styles.pageTitle}>Products Inventory</div>

                            <div className={styles.controlsWrapper}>
                                <div className={styles.sortContainer}>
                                    <button
                                        onClick={() => setReversed(prev => !prev)}
                                        className={styles.reverseBtn}
                                        style={{ height: !LogBut ? "45px" : "100px", }}
                                    >
                                        <Image src={"/Admin/Icons/reverse.svg"} width={25} height={25} alt='reverse' />
                                    </button>

                                    <div ref={ref} onClick={() => setLogBut(prev => !prev)} className={`${styles.dropdownWrapper} ${LogBut === false ? styles.DropIcon : styles.DropIcOpen}`}>
                                        <div className={styles.dropdownGrid}>
                                            <button
                                                className={styles.sortTriggerBtn}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                <span className={styles.sortText}>Sort By</span>
                                            </button>

                                            {LogBut &&
                                                <ul className={styles.sortList}>
                                                    {sortData.map(sort => (
                                                        <li key={sort.id}>
                                                            <button
                                                                className={styles.sortItemBtn}
                                                                style={{
                                                                    fontSize: Sort === sort.name ? "16px" : "15px",
                                                                    color: Sort === sort.name ? "#1a90e8" : "white"
                                                                }}
                                                                onClick={() => { setSorted(sort.name); setReversed(sort.name === "latest" ? true : false) }}
                                                            >
                                                                {sort.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <Link href='/Admin/Products/Add' className={`${styles.newpro} ${styles.addProductLink}`}>
                                    <Image src='/Admin/Icons/add.svg' width={30} height={30} alt='add' />
                                    <span>Add product</span>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.TableCon}>
                            <div className={styles.tableGridWrapper}>
                                <table className={styles.table}>
                                    <thead className={styles.thead}>
                                        <tr className={styles.tableTheadRow}>
                                            <th className={styles.thProduct}>Product</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th className={styles.thPrice}>Price</th>
                                            <th className={styles.thOldPrice}>Old Price</th>
                                            <th className={styles.thStock}>Stock</th>
                                            <th className={styles.thStatus}>Status</th>
                                            <th className={styles.thEdit}>Edit</th>
                                            <th className={styles.thDelete}>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data1.map((product: productTypes) => (
                                            <tr className={styles.pro} key={product.id}>
                                                <td>
                                                    <div className={styles.imageContainer}>
                                                        <Image
                                                            className={styles.productImage}
                                                            style={{ marginTop: product.stock === 0 ? "25px" : "15px" }}
                                                            src={product.image}
                                                            fill
                                                            key={`${product.id} - ${product.title}`}
                                                            alt={product.title}
                                                        />
                                                    </div>
                                                </td>
                                                <td className={styles.productTitleCell}>{product.title}</td>
                                                <td className={styles.desc}>{product.description}</td>
                                                <td className={styles.priceCell}>{product.price} SAR</td>
                                                <td>{product.oldPrice ? `${product.oldPrice} SAR` : "__________"}</td>
                                                <td className={styles.stockCell}>{product.stock}</td>
                                                <td>
                                                    <div className={`${styles.statusBadge} ${product.stock === 0 ? styles.statusOut :
                                                        product.stock < 10 ? styles.statusLow : styles.statusIn
                                                        }`}>
                                                        {product.stock === 0 && "Out of stock"}
                                                        {product.stock < 10 && product.stock > 0 && "Low stock"}
                                                        {product.stock >= 10 && "In stock"}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link href={`/Admin/Products/Edit/${product.id}`}>
                                                        <Image className={styles.editIconBtn} src={'/Admin/Icons/edit.svg'} width={45} height={45} alt='edit' />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Image
                                                        onClick={() => { setProductToDelete(product.id); setShowConfirm(true) }}
                                                        className={styles.deleteIconBtn}
                                                        src={'/Admin/Icons/delete.svg'}
                                                        width={45}
                                                        height={45}
                                                        alt='delete'
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {showConfirm === true && (
                                    <div className={styles.modalOverlay} onClick={() => setShowConfirm(false)}>
                                        <div className={InterSans.className}>
                                            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                                                <h3>Are you sure?</h3>
                                                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                                                <p>(double click to confirm delete)</p>

                                                <div className={styles.modalButtons}>
                                                    <button
                                                        onClick={() => setShowConfirm(false)}
                                                        className={`${styles.modalBtn} ${styles.btnCancel}`}
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        onClick={() => { setDeleteConfirmed(true); DeleteFromData(); }}
                                                        className={`${styles.modalBtn} ${styles.btnDelete}`}
                                                    >
                                                        Yes, Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}