"use client";
import Image from "next/image";
import styles from './Products.module.css';
import Link from "next/link";
import { supabase } from "@/lib/SubaBaseClient";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AllCategories({ title, data1, loading }) {

    const [isAdding, setIsAdding] = useState(false)
    const [pId, setpId] = useState(null)

    const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]

    const addToCart = async (item, e) => {
        if (isAdding) return;

        setpId(item.id)

        const { data } = await supabase.auth.getUser()
        if (!data.user) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(p => p.id === item.id);

            if (existing && existing.quantity >= 3) {
                toast.error('You have added maximum count of this product: 3', {
                    id: "quantity-locals-limit"
                });
                setIsAdding(false)
                setpId(null)
                return;
            }

            if (existing && existing.quantity + 1 > item.stock) {
                if (item.stock !== 3) {
                    toast.error(`Oops! Only ${item.stock} ${item.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
                } else {
                    toast.error('You have added maximum count of this product: 3', {
                        id: "quantity-limit"
                    });
                }
                setIsAdding(false)
                setpId(null)
                return;
            } else {

                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({ ...item, quantity: 1, stock: item.stock });
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        } if (data.user) {
            const { data: existingItem } = await supabase.from("cart").select("*").eq("user_id", data.user.id).eq("product_id", item.id).single()
            if (existingItem) {
                if (existingItem.quantity + 1 > item.stock) {
                    if (item.stock !== 3) {
                        toast.error(`Oops! Only ${item.stock} ${item.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
                    } else {
                        toast.error('You have added maximum count of this product: 3', {
                            id: "quantity-limit"
                        });
                    }
                    setIsAdding(false)
                    setpId(null)
                    return;
                } else {
                    if (existingItem && existingItem.quantity <= 2) {
                        const { error } = await supabase.from("cart").update({
                            quantity: existingItem.quantity + 1,
                        }).eq('id', existingItem.id)
                        if (error) {
                            console.log(error.message)
                        }
                        window.dispatchEvent(new Event("cartUpdated"));
                    }
                    else {
                        if (existingItem && existingItem.quantity >= 3) {
                            setIsAdding(false)
                            setpId(null)
                            toast.error('You have added maximum count of this product: 3', {
                                id: "quantity-limit"
                            });

                            return;
                        }
                    }
                }
            }
            else {
                const { error } = await supabase.from("cart").upsert({
                    user_id: data.user.id,
                    product_id: item.id,
                    quantity: 1,
                }, { onConflict: "product_id, user_id" })
                if (error) {
                    console.log(error.message)
                }
            }
        }
        flyImage(item, e);
        window.dispatchEvent(new Event("cartUpdated"));
        setIsAdding(false)
        setpId(null)
    };


    const flyImage = (item, e) => {

        const card = e.target.closest('.product-card');
        const productImg = card ? card.querySelector('img') : null;

        if (!productImg) return;


        const ButRect = e.target.getBoundingClientRect();
        const imgRect = productImg.getBoundingClientRect();
        const flyImg = document.createElement("img");

        flyImg.src = item.image;
        flyImg.style.position = "fixed";
        flyImg.style.left = ButRect.left + "px";
        flyImg.style.top = ButRect.top + "px";


        flyImg.style.width = imgRect.width + "px";
        flyImg.style.height = imgRect.height + "px";

        flyImg.style.transition = "all 0.8s ease-in-out";
        flyImg.style.zIndex = "1000";
        flyImg.style.objectFit = "contain";

        document.body.appendChild(flyImg);

        const cartIcon = document.querySelector(".cartIcon");

        if (cartIcon) {
            const cartRect = cartIcon.getBoundingClientRect();

            setTimeout(() => {
                flyImg.style.left = (cartRect.left + (cartRect.width / 2)) + "px";
                flyImg.style.top = (cartRect.top + (cartRect.height / 2)) + "px";
                flyImg.style.width = "0px";
                flyImg.style.height = "0px";
                flyImg.style.opacity = 0;
                flyImg.style.transform = "scale(0) rotate(360deg)";
            }, 10);

            setTimeout(() => flyImg.remove(), 900);
        }
    }

    return (
        <div style={{ position: "relative", margin: "0 auto", display: "grid", }}>
            <h2 style={{ marginTop: "100px", textAlign: 'center', justifyContent: 'center', alignItems: "center", display: "flex", marginBottom: "50px" }}>{title}</h2>
            <ul className={loading === true ? styles.skeletons : styles.products} style={{ justifyContent: "flex-start", alignItems: "center", overflowX: data1.length > 4 && "scroll", display: "flex", gap: "10px", }}>
                {loading === true ? data.map(img => (
                    <div key={img.id} className={styles.skeletonCard}>
                        <div className={styles.skeleton} style={{ width: "175px", height: "175px", flexShrink: 0, margin: "0 auto 15px auto", marginBottom: "28px" }}></div>

                        <div className={styles.skeleton} style={{ width: "80%", height: "22px", flexShrink: 0, marginLeft: "20px", marginBottom: "15px" }}></div>

                        <div style={{ marginBottom: "65px", marginTop: "25px", flexShrink: 0, }}>
                            <div className={styles.skeleton} style={{ width: "100%", height: "12px", marginBottom: "6px" }}></div>
                            <div className={styles.skeleton} style={{ width: "90%", height: "12px", marginBottom: "6px" }}></div>
                            <div className={styles.skeleton} style={{ width: "85%", height: "12px", marginBottom: "6px" }}></div>
                            <div className={styles.skeleton} style={{ width: "80%", height: "12px", marginBottom: "6px" }}></div>
                            <div className={styles.skeleton} style={{ width: "75%", height: "12px", marginBottom: "6px" }}></div>
                        </div>

                        <div style={{ height: "51px", display: "grid", alignContent: "center", marginBottom: "20px", flexShrink: 0, }}>
                            <div className={styles.skeleton} style={{ width: "50%", height: "16px", }}></div>
                            <div className={styles.skeleton} style={{ width: "50%", height: "25px", marginTop: "5px" }}></div>
                        </div>

                        <div className={styles.skeleton} style={{ width: "44%", height: "16px", flexShrink: 0, marginTop: "-9px" }}></div>

                        <div className={styles.skeleton} style={{ width: "44%", height: "16px", flexShrink: 0, marginTop: "19px" }}></div>

                        <div className={styles.skeleton} style={{ width: "95.42px", height: "37px", marginTop: "14px", marginRight: "-9px", alignSelf: "flex-end", borderRadius: "8px", flexShrink: 0, }}></div>
                    </div>
                ))
                    :
                    data1.map((img) => (
                        <div key={img.id} className={styles.product}>
                            <div className="product-card">
                                <Link href={`/product/${img.id}`}>
                                    <li>
                                        {img.oldPrice !== null && <div style={{ backgroundColor: "#1a75e8", color: "#fff", padding: "3px", position: "absolute", borderRadius: "4px", right: "-13px", top: "-8px", }}>sale</div>}
                                        <div style={{ width: "240px", height: "200px", position: "relative", marginLeft: "-14px", marginBottom: "15px" }}><Image style={{ marginBottom: "25px", objectFit: "contain" }} src={img.image} alt={img.title} fill /></div>
                                        <h3 className={styles.protitle}>{img.title}</h3>
                                        <p style={{ marginBottom: "19px" }} className={styles.prodes}>{img.description}</p>
                                        <div style={{ display: "grid", height: "51px", }}>
                                            {img.oldPrice !== null ? <div style={{ display: "flex", fontWeight: "bold", fontSize: "13px", marginTop: "7px" }}>was:&nbsp;<h6 style={{ textDecoration: "line-through", fontSize: "13px", }}>{img.oldPrice}</h6><h5 style={{ marginTop: "6px", marginLeft: "2px", fontSize: "9px" }}>SAR</h5></div> : null}
                                            <div style={{ display: "flex", marginTop: "5px", }}><h4 className={styles.price} style={{ fontSize: "20px" }}>{img.price}</h4><h5 style={{ marginTop: "6px", marginLeft: "2px", fontSize: "12px" }}>SAR</h5></div>
                                        </div>
                                        <span className={styles.StockText} style={{ color: img.stock <= 5 && img.stock !== 0 ? "#d97706" : img.stock !== 0 ? "#16a34a" : "#94a3b8" }}>{img.stock <= 5 && img.stock !== 0 ? `only ${img.stock} ${img.stock > 1 ? `products left in stock ( ! )` : `product left in stock ( ! )`}` : img.stock !== 0 ? "In Stock ✓" : "Sold Out ✕"}</span>
                                        <span style={{ textAlign: "left", left: 0, fontSize: "13px", float: "left", display: "flex", marginTop: "19px" }}>get it<span style={{ fontWeight: "bold", paddingLeft: "3px" }}>{img.time === 1 && "tomorrow" || img.time % 7 !== 0 && `after ${img.time} days` || img.time % 7 === 0 && `after ${img.time / 7} ${img.time / 7 === 1 ? `week` : `weeks`}`}</span></span>
                                    </li>
                                </Link>
                                {img.stock === 0 ? <button style={{ border: "none", cursor: "not-allowed", marginTop: "50px", pointerEvents: "none", }} className={styles.outStock}>Out of Stock</button> : <button onClick={(e) => addToCart(img, e)} disabled={isAdding} style={{ border: "none", cursor: pId !== img.primary_key ? "pointer" : "not-allowed", marginTop: "50px", pointerEvents: pId !== img.primary_key ? "auto" : "none", }} className={styles.cartbut}>{pId !== img.primary_key ? "Add To Cart" : "Adding ..."}</button>}
                            </div>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}
