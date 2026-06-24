"use client";
import Link from "next/link";
import Logo from '@/elements/Logo/Logo';
import styles from './Header.module.css';
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/SubaBaseClient";
import Image from "next/image";
import toast from "react-hot-toast";


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
                    console.error(error)
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
                    console.error(error)
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
                toast.error("Failed to logout.", { id: "flogout" })
                console.error(error)
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
                        <div className={styles.profileWrapper} ref={ref}>
                            <button onClick={() => { SetProB(prev => !prev) }} className={styles.profileButton}>
                                <div className={styles.avatarCircle}>
                                    <h3 className={`${styles.logname} ${styles.avatarText}`}>
                                        {avatar}
                                    </h3>
                                </div>
                            </button>

                            {ProfB &&
                                <div className={styles.profileMenu}>
                                    <div className={styles.profileInfo}>
                                        <div className={styles.avatarCircle}>
                                            <h3 className={`${styles.logname} ${styles.avatarText}`}>
                                                {avatar}
                                            </h3>
                                        </div>

                                        <div className={styles.profileData}>
                                            <h3 className={styles.profileName}>
                                                {!role ? `welcome ${Name}` : Name}{role && ` - ${role}`}
                                            </h3>

                                            <h4 className={styles.profileEmail}>
                                                {email}
                                            </h4>
                                        </div>
                                    </div>

                                    <div>
                                        {role &&
                                            <div className={styles.dashboardWrapper}>
                                                <Link href='/Admin/Dashboard' className={styles.orders}>
                                                    <span className={styles.dashboardText}>
                                                        <Image className={styles.menuIcon} src='/help_icons/dashboard.svg' width={25} height={25} alt="Dashboard" />
                                                        Dashboard
                                                    </span>
                                                </Link>
                                            </div>
                                        }

                                        <div className={styles.ordersWrapper}>
                                            <Link
                                                className={router === "orders" ? styles.Dashboard : styles.orders}
                                                href='/orders'
                                            >
                                                <span className={styles.ordersText}>
                                                    <Image className={styles.menuIcon} src='/help_icons/order.svg' width={25} height={25} alt="orders" />
                                                    My Orders
                                                </span>
                                            </Link>
                                        </div>

                                        <div className={styles.logoutWrapper}>
                                            <button
                                                className={`${styles.logout} ${styles.logoutButton}`}
                                                onClick={RemoveUser}
                                            >
                                                <Image src='/help_icons/logout.svg' width={25} height={25} alt="Logout" />
                                                <span className={styles.logoutText}>
                                                    Log Out
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div>
                            <Link className={`${styles.signup} ${styles.signupLink}`} href='/signup'>
                                Sign Up
                            </Link>

                            <Link className={styles.login} href='/login'>
                                Login
                            </Link>
                        </div>
                    }

                    <div className={`${styles.cart} cartIcon`}>
                        <Link href='/cart'>
                            <svg
                                height="60"
                                viewBox="0 0 14 44"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.cartSvg}
                            >
                                <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                            </svg>

                            {cartCount > 0 &&
                                <span className={styles.cartCount}>
                                    {cartCount}
                                </span>
                            }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}