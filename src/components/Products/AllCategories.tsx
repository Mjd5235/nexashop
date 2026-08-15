"use client";
import Image from "next/image";
import styles from './Products.module.css';
import Link from "next/link";
import { supabase } from "@/lib/SubaBaseClient";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { productTypes } from "@/types/types";

interface categoriesProps {
    title: string,
    data1: productTypes[],
    loading: boolean,
    category: string,
}

export default function AllCategories({ title, data1, loading, category }: categoriesProps) {

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [pId, setpId] = useState<number | null>(null)

    const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]

    const addToCart = async (item: productTypes, e: React.MouseEvent) => {
        if (isAdding) return;

        setIsAdding(true)
        setpId(item.id)

        const { data } = await supabase.auth.getUser()
        if (!data.user) {
            let cart: productTypes[] = JSON.parse(localStorage.getItem("cart") || "[]");

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
                            toast.error("Failed to add the product to your cart.", { id: "faddcart" })
                            console.error(error)
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
                    toast.error("Failed to add the product to your cart.", { id: "faddcart" })
                    console.error(error)
                }
            }
        }
        flyImage(item, e as React.MouseEvent<HTMLButtonElement>);
        window.dispatchEvent(new Event("cartUpdated"));
        setIsAdding(false)
        setpId(null)
    };


    const flyImage = (item: productTypes, e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLElement
        const card = target.closest('.product-card');
        const productImg = card ? card.querySelector('img') : null;

        if (!productImg) return;


        const ButRect = target.getBoundingClientRect();
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
                flyImg.style.opacity = "0";
                flyImg.style.transform = "scale(0) rotate(360deg)";
            }, 10);

            setTimeout(() => flyImg.remove(), 900);
        }
    }

    return (
        <div className={styles.productsWrapper}>
            <h2 className={styles.productsTitle}>{title}</h2>

            <ul
                className={`${loading === true ? styles.skeletons : styles.products} ${styles.productsList}`}
                style={{ overflowX: data1.length > 4 ? "scroll" : "auto" }}
            >
                {loading === true
                    ? data.map(img => (
                        <div key={img.id} className={styles.skeletonCard}>
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
                        </div>
                    ))
                    :
                    data1.map((img) => (
                        <div key={img.id} className={styles.product}>
                            <div className="product-card">
                                <Link href={`/product/${img.id}`}>
                                    <li>

                                        {img.oldPrice !== null &&
                                            <div className={styles.saleBadge}>
                                                sale
                                            </div>
                                        }

                                        <div className={styles.productImageWrapper}>
                                            <Image
                                                className={styles.productImage}
                                                src={img.image}
                                                alt={img.title}
                                                fill
                                            />
                                        </div>

                                        <h3 className={styles.protitle}>
                                            {img.title}
                                        </h3>

                                        <p className={`${styles.prodes} ${styles.productDescriptionMargin}`}>
                                            {img.description}
                                        </p>

                                        <div className={styles.priceContainer}>

                                            {img.oldPrice !== null ?
                                                <div className={styles.oldPriceRow}>
                                                    was:&nbsp;
                                                    <h6 className={styles.oldPriceValue}>
                                                        {img.oldPrice}
                                                    </h6>

                                                    <h5 className={styles.oldPriceSar}>
                                                        SAR
                                                    </h5>
                                                </div>
                                                : null}

                                            <div className={styles.currentPriceRow}>
                                                <h4 className={`${styles.price} ${styles.currentPrice}`}>
                                                    {img.price}
                                                </h4>

                                                <h5 className={styles.currentPriceSar}>
                                                    SAR
                                                </h5>
                                            </div>

                                        </div>

                                        <span
                                            className={styles.StockText}
                                            style={{
                                                color:
                                                    img.stock <= 5 && img.stock !== 0
                                                        ? "#d97706"
                                                        : img.stock !== 0
                                                            ? "#16a34a"
                                                            : "#94a3b8"
                                            }}
                                        >
                                            {img.stock <= 5 && img.stock !== 0
                                                ? `only ${img.stock} ${img.stock > 1
                                                    ? `products left in stock ( ! )`
                                                    : `product left in stock ( ! )`
                                                }`
                                                : img.stock !== 0
                                                    ? "In Stock ✓"
                                                    : "Sold Out ✕"}
                                        </span>

                                        <span className={styles.deliveryText}>
                                            get it
                                            <span className={styles.deliveryTime}>
                                                {img.time === 1 && "tomorrow" ||
                                                    img.time % 7 !== 0 && `after ${img.time} days` ||
                                                    img.time % 7 === 0 && `after ${img.time / 7} ${img.time / 7 === 1 ? `week` : `weeks`}`}
                                            </span>
                                        </span>

                                    </li>
                                </Link>

                                {img.stock === 0 ?

                                    <button
                                        className={`${styles.outStock} ${styles.outStockButton}`}
                                    >
                                        Out of Stock
                                    </button>

                                    :

                                    <button
                                        onClick={(e) => addToCart(img, e)}
                                        disabled={isAdding}
                                        className={`${styles.cartbut} ${styles.addCartButton}`}
                                        style={{
                                            cursor: isAdding === false ? "pointer" : "not-allowed",
                                            pointerEvents: isAdding === false ? "auto" : "none",
                                            opacity: isAdding === true && pId !== img.primary_key ? "0.5" : "1",
                                        }}
                                    >
                                        {pId !== img.primary_key ? "Add To Cart" : "Adding ..."}
                                    </button>

                                }
                            </div>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}
