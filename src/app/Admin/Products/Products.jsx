"use client"
import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Image from 'next/image';
import { supabase } from "@/lib/SubaBaseClient";
import styles from './Products.module.css'
import Link from 'next/link';
import { Inter } from 'next/font/google';

const InterSans = Inter({
    subsets: ["latin"],
    weight: ["500"]
})

export default function Products() {

    const [sided, setSided] = useState(true)

    const [LogBut, setLogBut] = useState(false)

    const ref = useRef()

    const [Sort, setSorted] = useState("latest")

    const [reversed, setReversed] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)

    const sortData = [
        { id: 1, name: "latest", },
        { id: 2, name: "stock", },
        { id: 3, name: "price", },
    ]

    const [data1, setData1] = useState([])

    const SideB = () => {
        { sided === true ? setSided(false) : setSided(true) }
    }


    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order(Sort === "stock" && "stock" || Sort === "main" && "id" || Sort === "price" && "price" || Sort === "latest" && "created_at", { ascending: reversed !== true ? true : false })

            if (error) {
                console.log(error.message)
            } else {
                setData1(data)
            }
        }

        getData()
    }, [Sort, reversed])


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
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
                console.log(error.message)
            } else {
                setData1(prev => prev.filter(product => product.id !== productToDelete))
            }
            setShowConfirm(false)
        } else {
            return;
        }
    }

    return (
        <div className={styles.dashboardGrid}>
            <div className={styles.mainFlexContainer}>

                <div className={sided ? styles.sidebarHidden : styles.sidebarWrapper} style={{ display: sided ? "flex" : "none" }}>
                    <Sidebar height="3500px" font="Products" />
                </div>

                <Image
                    className={styles.menuIcon}
                    src={'/Admin/Icons/menu.svg'}
                    width={35}
                    height={35}
                    alt='menu'
                    onClick={SideB}
                />

                <div className={styles.contentContainer}>
                    <Header />
                    <div>

                        <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-between", }}>

                            <div style={{ fontWeight: "bold", background: "linear-gradient(to right, #1a75e8, #1a90e8)", fontWeight: "700", fontSize: "32px", letterSpacing: "0.5px", color: "transparent", whiteSpace: 'nowrap', backgroundClip: "text", width: "350px", marginLeft: "30px" }}>Products Inventory</div>
                            <div style={{ display: 'flex', gap: "50px" }}>
                                <div style={{ display: "flex", }}>
                                    <button onClick={() => setReversed(prev => !prev)} style={{ backgroundColor: "#1a75e8", height: !LogBut ? "45px" : "100px", width: "30px", borderRadius: "8px 0 0 8px", marginTop: "20px", border: "none", cursor: "pointer" }}><Image src={"/Admin/Icons/reverse.svg"} width={25} height={25} alt='reverse' /></button>
                                    <div ref={ref} style={{ marginTop: "17px" }}>

                                        <div style={{ display: "grid" }}>
                                            <button onClick={() => LogBut === false ? setLogBut(true) : setLogBut(false)} style={{ backgroundColor: "#3a3a3a", marginTop: "3px", height: "45px", borderRadius: "0 8px 8px 0", display: 'flex', justifyContent: "center", alignItems: "center", alignContent: 'center', fontWeight: "bold", border: "none", color: "white", fontSize: "15px", cursor: "pointer" }}>

                                                {!LogBut ?
                                                    <Image onClick={() => setLogBut(true)} style={{ cursor: 'pointer' }} src={'/Admin/Icons/dropdown.svg'} width={30} height={30} alt='user' />
                                                    :
                                                    <Image style={{ cursor: 'pointer' }} onClick={() => setLogBut(false)} src={'/Admin/Icons/dropup.svg'} width={30} height={30} alt='user' />}
                                                <span style={{ marginRight: "8px", }}>Sort By</span>
                                            </button>

                                            {LogBut &&
                                                <ul style={{ backgroundColor: "#3a3a3a", borderRadius: "0 0 8px 0", paddingLeft: "11px", marginTop: "-7px", paddingTop: "2px", paddingBottom: "8px", display: 'grid', justifyContent: "center", alignItems: "center", alignContent: 'center', fontWeight: "bold", border: "none", color: "white", fontSize: "15px", height: "62px" }}>
                                                    {sortData.map(sort => (
                                                        <li key={sort.id}><button style={{ background: "none", border: "none", fontWeight: "bold", fontSize: Sort === sort.name ? "16px" : "15px", color: Sort === sort.name ? "#1a90e8" : "white", cursor: "pointer" }} onClick={() => { setSorted(sort.name); setReversed(sort.name === "latest" ? true : false) }}> {sort.name}</button></li>
                                                    ))}
                                                </ul>
                                            }</div>
                                    </div>
                                </div>

                                <Link href='/Admin/Products/Add' className={styles.newpro} style={{ width: "145px", height: "45px", justifyContent: "center", alignItems: 'center', alignContent: "center", textAlign: "center", marginTop: "20px", marginRight: "150px", border: "none", fontSize: "16px", fontWeight: "bold", color: "white", cursor: "pointer", display: 'flex', paddingRight: "5px", }}><Image src='/Admin/Icons/Add.svg' width={30} height={30} alt='add' /><span>Add product</span></Link>
                            </div>
                        </div>

                        <div style={{ marginTop: "50px" }}>
                            <table className={styles.table} style={{ justifyContent: "space-between", paddingBottom: "15px", marginLeft: "0px", marginRight: "90px", paddingTop: "25px", textAlign: 'left', width: "1375px" }}>
                                <thead className={styles.thead} style={{ padding: "30px" }}>
                                    <tr style={{ justifyContent: "space-between", }}>
                                        <th style={{ paddingLeft: "30px" }}>Product</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th style={{ paddingLeft: "15px" }}>Price</th>
                                        <th style={{ paddingLeft: "2px" }}>Old Price</th>
                                        <th style={{ paddingRight: "20px" }}>Stock</th>
                                        <th style={{ paddingLeft: "25px" }}>Status</th>
                                        <th style={{ paddingLeft: "20px" }}>Edit</th>
                                        <th style={{ paddingLeft: "20px" }}>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data1.map(product => (
                                        <tr className={styles.pro} key={product.id} style={{ justifyContent: "space-between", width: "1350px", }}>
                                            <td><div style={{ position: "relative", width: "150px", height: "120px", marginBottom: "28px", marginLeft: "-10px" }}><Image style={{ marginTop: product.stock === 0 ? "25px" : "15px", objectFit: "contain" }} src={product.image} fill key={product.title - product.id} alt={product.title} /></div></td>
                                            <td style={{ fontWeight: 'bold' }}>{product.title}</td>
                                            <td className={styles.desc}>{product.description}</td>
                                            <td style={{ fontWeight: 'bold', paddingRight: "30px" }}>{product.price} SAR</td>
                                            <td>{product.oldPrice ? `${product.oldPrice} SAR` : "__________"}</td>
                                            <td style={{ paddingLeft: "19px" }}>{product.stock}</td>
                                            <td>{<div style={{ backgroundColor: product.stock === 0 && "#ef4444" || product.stock < 10 && "#f59e0b" || product.stock >= 10 && "#22c55e", display: 'flex', justifyContent: 'center', alignItems: "center", alignContent: "center", padding: "10px 0px 10px 0px", color: "white", borderRadius: "8px", width: "110px", fontWeight: "bold" }}>{product.stock === 0 && "Out of stock" || product.stock < 10 && "Low stock" || product.stock >= 10 && "In stock"}</div>}</td>
                                            <td><Link href={`/Admin/Products/Edit/${product.id}`}><Image style={{ backgroundColor: "#1a75e8", padding: "10px", marginLeft: "15px", borderRadius: "8px", marginTop: "3px" }} src={'/Admin/Icons/edit.svg'} width={45} height={45} alt='edit' /></Link></td>
                                            <td><Image onClick={() => { setProductToDelete(product.id); setShowConfirm(true) }} style={{ backgroundColor: "#ef4444", padding: "10px", borderRadius: "8px", marginTop: "3px", cursor: "pointer", marginLeft: "25px" }} src={'/Admin/Icons/delete.svg'} width={45} height={45} alt='edit' /></td>
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
                </div >
            </div >
        </div >
    )
}