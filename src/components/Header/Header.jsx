"use client";
import Link from "next/link";
import Logo from '@/elements/Logo/Logo';
import styles from './Header.module.css';
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [Name, setName] = useState(null)

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
  }

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setName(user.name)
    }
  })

  const RemoveUser = () => {
    localStorage.removeItem('user')
    setName(null)
    window.location.reload()
  }


  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.space}>
        <div className={styles.authbut}>
          {Name !== null ? <div style={{display: "flex"}}><button className={styles.signup} style={{border: "none", cursor: "pointer", marginRight: "10px",}} onClick={RemoveUser}>Log Out</button><p className={styles.wel} style={{marginTop: "9px"}}>Welcome</p><h3 className={styles.logname} style={{color: "#1a75e8", paddingLeft: "7px",marginTop: "7px",}}>{Name}</h3></div> : <div><Link style={{marginRight: "15px"}} className={styles.signup} href='/signup'>Sign Up</Link><Link className={styles.login} href='/login'>Login</Link></div>}
        
        <div className={`${styles.cart} cartIcon`}>
          <Link href='/cart'>
            <svg height="60" viewBox="0 0 14 44" width="24" xmlns="http://www.w3.org/2000/svg" style={{fill: "#fff", marginTop: "6px", marginLeft: "10px", marginRight: "32px"}}><path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path></svg>
            {cartCount > 0 && <span className={styles.cartCount}> {cartCount}</span>}
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}