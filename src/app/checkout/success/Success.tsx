"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { supabase } from '@/lib/SubaBaseClient'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { User } from '@supabase/supabase-js'

const InterSans = Inter({
    subsets: ["latin"],
    weight: ["800", "900"]
})

interface OrderData {
    id: string
    created_at: string
    status: string
    user_avatar: string
    user_email: string
    cart_items: []
    total_price: number
}

export default function Success() {

    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [date, setDate] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getData = async () => {
            const { data: user } = await supabase.auth.getUser()
            setUserEmail((user.user as User).email ?? "")
            const { data: order, error } = await supabase.from("orders").select("*").eq("user_id", (user.user as User).id).order("created_at", { ascending: false }).limit(1).single()
            if (error) { console.error(error); toast.error("Failed to load the invoice.", { id: "finvoice" }) } else {
                setId(order.id.slice(0, 6).toUpperCase())
                setStatus(order.status)
                setTotal(order.total_price)
                setDate(order && new Date(order.created_at).toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "short", }))
            }
            setLoading(false)
        }
        getData()
    }, [])

    return (
        <div className={styles.successBg}>
            <div className={styles.container}>
                {loading === false ?
                    <div className={styles.card}>
                        <div className={styles.logo}>
                            <Link href='/'>
                                <div className={InterSans.className}>
                                    <span>Nexa</span><span className={styles.blueLogo}>Shop</span>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.items}>
                            <div className={styles.checkMarkCon}>
                                <div className={styles.checkMark}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a75e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline className={styles.CheckPolyline} points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <h1 className={styles.thankYou}>Thank you!</h1>
                            <div className={styles.successText}>Your payment was processed successfully.</div>
                            <div className={styles.orderDetails}>
                                <div className={styles.detailsContainer}>
                                    <div className={styles.detailContainer}><div className={styles.detail}>ORDER NUMBER<div className={styles.detailFill}>{id && "#NEXA-"}{id}</div></div></div>
                                    <div className={styles.detailContainer}><div className={styles.detail}>ORDER STATUS<div className={styles.successCon}>{status && <div className={styles.successDetailFill}>{status}</div>}</div></div></div>
                                    <div className={styles.detailContainer}><div className={styles.detail}>ORDER DATE<div className={styles.detailFill}>{date}</div></div></div>
                                    <div className={styles.detailContainer}><div className={styles.detail}>PAYMENT METHOD<div className={styles.detailFill}>Visa Card(**** 9012)</div></div></div>
                                    <div className={styles.detailContainer}><div className={styles.detail}>SHIPPING ADDRESS<div className={styles.detailFill}>King Fahd Road, Al Olaya, Riyadh 12212, Saudi Arabia</div></div></div>
                                </div>
                            </div>
                            <div className={styles.totalPriceSec}>
                                <div className={InterSans.className}><div className={styles.totalPrice}><div className={styles.totalText}>Total</div><div className={styles.totalNumber}>{total} {total && "SAR"}</div></div></div>
                            </div>
                            <div className={styles.emailSentWrapper}>
                                <div className={styles.emailSentCon}>
                                    <div className={styles.iconCon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div className={styles.emailSentText}>A confirmation email has been sent to </div>
                                </div>
                                <div className={styles.userEmail}>{userEmail}</div>
                            </div>
                            <div className={styles.actionButtons}>
                                <Link href={'/orders'} className={styles.trackingButton}><div className={styles.trackOrderText}>Track Order</div>
                                    <svg className={styles.arrowIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                                <Link href={'/'} className={styles.shoppingButton}>Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                    : null}
            </div >
        </div>
    )
}