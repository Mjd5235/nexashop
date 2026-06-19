"use client";
import Link from "next/link";
import Logo from '@/elements/Logo/Logo';
import styles from './Header.module.css';
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/SubaBaseClient";
import Image from "next/image";


export default function Header({ router }) {

    const [cartCount, setCartCount] = useState(0);
    const [Name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [role, setRole] = useState()

    const ref = useRef()


    const [ProfB, SetProB] = useState(false)
    const [localCart, setLocalCart] = useState(null)

    const updateCartCount = async () => {
        const { data } = await supabase.auth.getUser()
        if (data.user) {
            const { data: cart, error } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time)").eq("user_id", data.user.id).order("created_at", { ascending: false })
            if (cart && cart.length === 0) {
                setLocalCart(true)
                const locart = JSON.parse(localStorage.getItem("cart")) || [];
                setCartCount(locart.reduce((acc, item) => acc + (item.quantity || 1), 0));
            } else {

                setLocalCart(false)
                const { data: quan, } = await supabase.from("cart").select("*").eq("user_id", data.user.id)
                setCartCount(quan.reduce((acc, item) => acc + (item.quantity || 1), 0));
                if (error) {
                    console.log(error.message)
                }
            }
        }

        if (!data.user) {
            const locart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(locart.reduce((acc, item) => acc + (item.quantity || 1), 0));
        }
    }

    useEffect(() => {
        updateCartCount();
        window.addEventListener("cartUpdated", updateCartCount);
        return () => window.removeEventListener("cartUpdated", updateCartCount);
    }, []);

    useEffect(() => {
        const handleOutClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                SetProB(false)
            }
        }
        document.addEventListener("click", handleOutClick)
        return () => document.removeEventListener("click", handleOutClick)

    }, [])

    useEffect(() => {
        const GetUsers = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (data.user) {
                setName(data.user.user_metadata.name)
                setEmail(data.user.email)
                setAvatar(data.user.user_metadata.name.charAt(0).toUpperCase())
                if (error) {
                    console.log(error.message)
                }
            }
        }
        GetUsers()
    }, [])

    useEffect(() => {
        const GetRole = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

                if (profile?.role === 'admin') {
                    setRole(profile.role)
                }
            }
        }
        GetRole()
    }, [])

    const RemoveUser = async () => {
        const { data } = await supabase.auth.getUser()
        if (data.user) {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.log(error.message)
            }
            else {
                setName(null)
                window.location.reload()
            }
        }
    }

    return (
        <div className={styles.header}>
            <Logo />
            <div className={styles.space}>
                <div className={styles.authbut}>
                    {Name !== null ?
                        <div style={{ display: "grid", }} ref={ref} >
                            <button onClick={() => { SetProB(prev => !prev) }} style={{ border: "none", background: "none" }}>
                                <div style={{ backgroundColor: "#1a75e8", padding: "9.5px 14px 9px 14px", borderRadius: "100%", cursor: "pointer", width: "44.5px", height: "44px" }}>
                                    <h3 className={styles.logname} style={{ cursor: "pointer", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", alignContent: 'center', justifyItems: "center", fontWeight: "normal" }}>
                                        {avatar}
                                    </h3>
                                </div>
                            </button>
                            {ProfB &&
                                <div style={{ position: "absolute", top: "65px", right: "12px", width: "265px", height: "auto", backgroundColor: "#242424", border: 'solid 1px #333333' }}>
                                    <div style={{ display: 'flex', marginLeft: "16px", marginTop: "24px", borderBottom: "solid 2px #2d2d2d", paddingBottom: "20px", width: "210px" }}>
                                        <div style={{ backgroundColor: "#1a75e8", padding: "9.5px 14px 9px 14px", borderRadius: "100%", cursor: "pointer", width: "44.5px", height: "44px" }}>
                                            <h3 className={styles.logname} style={{ cursor: "pointer", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", alignContent: 'center', justifyItems: "center", fontWeight: "normal" }}>
                                                {avatar}
                                            </h3>
                                        </div>
                                        <div style={{ display: 'grid', marginLeft: "16px", marginTop: "5px", }}>
                                            <h3 style={{ fontWeight: "normal", marginBottom: "6px" }}>{!role ? `welcome ${Name}` : Name}{role && ` - ${role}`}</h3>
                                            <h4 style={{ color: "gray", fontSize: "14px", fontWeight: "400" }}>{email}</h4>
                                        </div>
                                    </div>
                                    <div>
                                        {role &&
                                            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', borderBottom: "solid 2px #2d2d2d", paddingBottom: "20px", width: "210px", marginLeft: "20px" }}>
                                                <Link href='/Admin/Dashboard' className={styles.orders} style={{ border: "none", cursor: "pointer", marginTop: "24px", width: "210px", }}>
                                                    <span style={{ fontSize: "14px", display: "flex", alignItems: "center", marginLeft: "2px", }}><Image style={{ marginRight: "8px" }} src='/help_icons/Dashboard.svg' width={25} height={25} alt="Dashboard" />Dashboard</span>
                                                </Link>
                                            </div>
                                        }
                                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', borderBottom: "solid 2px #2d2d2d", paddingBottom: "20px", width: "210px", marginLeft: "20px", }}>
                                            <Link className={router === "orders" ? styles.Dashboard : styles.orders} href='/orders' style={{ border: "none", cursor: "pointer", fontSize: "14px", marginTop: "24px", width: "210px", color: "#fff", fontWeight: "bold", }}>
                                                <span style={{ display: "flex", alignItems: "center", marginLeft: "2px", fontWeight: "normal", }}><Image style={{ marginRight: "8px" }} src='/help_icons/order.svg' width={25} height={25} alt="orders" />My Orders</span>
                                            </Link>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: 'center', marginBottom: "20px" }}>
                                            <button className={styles.logout} style={{ border: "none", cursor: "pointer", marginRight: "10px", marginTop: "12px", width: "210px", }} onClick={RemoveUser}>
                                                <Image src='/help_icons/logout.svg' width={25} height={25} alt="Logout" />
                                                <span style={{ fontSize: "14px", display: "flex", alignItems: "center", marginLeft: "8px" }}>Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div><Link style={{ marginRight: "15px" }} className={styles.signup} href='/signup'>Sign Up</Link><Link className={styles.login} href='/login'>Login</Link></div>}
                    <div className={`${styles.cart} cartIcon`}>
                        <Link href='/cart'>
                            <svg height="60" viewBox="0 0 14 44" width="24" xmlns="http://www.w3.org/2000/svg" style={{ fill: "#fff", marginTop: "6px", marginLeft: "10px", marginRight: "32px" }}><path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path></svg>
                            {cartCount > 0 && <span className={styles.cartCount}> {cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}