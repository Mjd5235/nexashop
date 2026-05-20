"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from './page.module.css'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Image from 'next/image'
import Link from "next/link";
import { supabase } from "@/lib/SubaBaseClient";
import toast from "react-hot-toast";

export default function Page() {

  const [data6, setData6] = useState([]);
  const [logged, setLogged] = useState(false)
  const [localCart, setLocalCart] = useState(false)
  const [selectedColor, setSelectedColor] = useState({});
  const [quan, setQuan] = useState(1)
  const [Loading, setLoading] = useState(true)
  const [increasingId, setIncId] = useState(null)
  const [decreasingId, setDecId] = useState(null)
  const [isRemoving, setIsRemoving] = useState(null)

  const timerRef = useRef()

  useEffect((index) => {
    const getData = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setData6(cartItems)
      } else {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartItems.length === 0) {
          const { data: cart, error: bug } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id).order("created_at", { ascending: false })
          if (bug) { console.log(bug.message) } else {
            if (cart && cart.length > 0) {
              setData6(cart)
            } else {
              const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
              setData6(cartItems)
              window.dispatchEvent(new Event("cartUpdated"));
              setLocalCart(true)
              setLoading(false)
            }
          }
        }
        const { data: cart, } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id).order("created_at", { ascending: false })
        setData6(cart)
        setLocalCart(false)
        setLoading(false)
      }
      setLoading(false)
      setIsRemoving(null)
    }
    getData()

  }, [quan]);


  const removeFromCart = async (index, img) => {
    setIsRemoving(img.id)
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      setData6([...cart]);
    } else {
      const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
      setQuan(prev => prev + 5)
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };


  const removeCart = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice("cart");
      localStorage.setItem("cart", JSON.stringify(cart));

      setData6([...cart]);
    }
    else {
      const { } = await supabase.from("cart").delete("*").eq("user_id", data.user.id)
      setData6(null)
      setQuan(prev => prev + 5)
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setLoading(false)
  }

  const increaseQty = async (index, img) => {
    setIncId(img.id)
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart[index].quantity < 3 && cart[index].quantity + 1 <= img.stock) {
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        setData6([...cart]);
      } else {
        if (img.stock !== 3) {
          toast.error(`Oops! Only ${img.stock} ${img.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
        } else {
          toast.error('You have added maximum count of this product: 3', {
            id: "quantity-limit"
          });
        }
        setIncId(null)
        return;
      }
    }
    else {
      const newData = [...data6]
      if (newData[index].quantity < 3 && newData[index].quantity + 1 <= img.products.stock) {
        const Quantity = newData[index].quantity += 1
        setData6([...newData])

        // I used setTimeOut, clearTimeOut because of race conditions occurring between the interface and the supabase data. //
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(async () => { const { } = await supabase.from("cart").update({ quantity: Quantity }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key); timerRef.current = null }, 50)
      }
      else {
        if (img.products.stock !== 3) {
          toast.error(`Oops! Only ${img.products.stock} ${img.products.stock === 1 ? "item" : "items"} left in stock.`, { id: "stock-limit-toast" })
        } else {
          toast.error('You have added maximum count of this product: 3', {
            id: "quantity-limit"
          });
        }
        setIncId(null)
        return;
      }
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setIncId(null)
  };

  const decreaseQty = async (index, img) => {
    setDecId(img.id)
    const { data } = await supabase.auth.getUser()
    if (!data.user || localCart === true) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart[index].quantity > 0) {
        cart[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        setData6([...cart]);
      }
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        setData6([...cart]);
      }
    }
    else {
      const newData = [...data6]
      if (newData[index].quantity !== 1) {
        const Quantity = newData[index].quantity -= 1
        setData6([...newData])
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(async () => { const { } = await supabase.from("cart").update({ quantity: Quantity }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key); timerRef.current = null }, 50)
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key);
        setQuan(prev => prev + 5)
      }
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setDecId(null)
  };

  const CheckedOut = async () => {
    if (logged === true) { toast.success("Checked Out Successfully.") } else { toast.error("Please log in to continue to checkout.") }
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      setLogged(true)
      const { } = await supabase.from("cart").delete("*").eq("user_id", data.user.id)
      setData6(null)
      setLoading(false)
    }
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const StockValidation = async (img) => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(p => p.id === img.id);

      if (existing.quantity > img.stock) {
        existing.quantity = img.stock;
        toast.error("kjldsfsdf", { id: "kljsdf" })
      }

    }
    if (data.user) {
      if (img.quantity > img.products.stock) {
        if (img.products.stock !== 0) {
          const { } = await supabase.from("cart").update({ quantity: img.products.stock }).eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
        } else {
          const { } = await supabase.from("cart").delete().eq("user_id", data.user.id).eq("product_id", img.products.primary_key)
        }
        const { data: cart } = await supabase.from("cart").select("id, quantity, products: product_id (primary_key, title, image, price, oldPrice, time, stock)").eq("user_id", data.user.id).order("created_at", { ascending: false })
        setData6(cart)
        toast("We’ve updated your cart items to match the current stock.",
          {
            icon: "🛍️",
            style: {
              backgroundColor: "#fff",
              color: "#1a1a1a",
              borderLeft: "solid 4px #1a75e8",
              maxWidth: "400px",
              boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
              borderRadius: "6px",
              padding: "14px 20px",
              fontWeight: "600",
              fontSize: "14px"
            }
          }
          , { id: "update-cart-quantity", duration: 5000 }
        )
        window.dispatchEvent(new Event("cartUpdated"));
      }
    }
  }

  const totalPrice = data6 && data6.reduce((acc, item) => {
    const shipping = 12;
    const price = Number(logged === false || localCart === true ? item.price : item.products.price);
    const quantity = Number(item.quantity);

    return acc + price * quantity + shipping
  }, 0);

  const finalPrice = Number(totalPrice && totalPrice.toFixed(2))



  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setLogged(true)
      }
    }
    getUser()
  }, [])



  const responsiveStyles = `
@media (max-width: 920px) {
body{
overflow-y: hidden;
}
  /* جعل عنصر المنتج يتحول لعمودي */
  .cart-item {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    align-items: center !important;
    text-align: center !important;
  }

  /* الصورة تصير أكبر */
.cart-image {
  position: relative;
  width: 100% !important;
  max-width: 260px !important;
  height:  210px!important;
  border-radius: 12px !important;
}


  /* تفاصيل المنتج */
  .cart-details {
    position: relative;
    margin-top: 30px;
    margin-left: 0 !important;
    align-items: center !important;
  }

  /* الأسعار تصير تحت */
  .cart-prices {
    text-align: center !important;
  }

  /* أزرار Delete All + Checkout تتكدس فوق بعض */
  .cart-actions {
    flex-direction: column !important;
    gap: 20px !important;
  }

  /* الزرين يصيرون أعرض */
  .cart-actions button {
    width: 90% !important;
  }A

  h1 {
    font-size: 32px !important;
  }
}
`;



  return (
    <div>
      <Header />

      <style>{responsiveStyles}</style>

      <h1
        style={{
          textAlign: "center",
          fontSize: "52px",
          marginBottom: "65px",
          paddingTop: "115px",
          fontWeight: "700",
          letterSpacing: "1px",
          color: "#111",
          background: "linear-gradient(90deg, #111, #444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          animation: "fadeIn 0.8s ease",
        }}
      >
        Cart
      </h1>

      {Array.isArray(data6) && data6.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {data6.map((img, index) => (

            <li
              onLoad={() => StockValidation(img)}
              key={logged === false || localCart === true ? img.primary_key : img.products.primary_key}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr 150px",
                gap: "20px",
                padding: "20px 0",
                borderBottom: "1px solid #ccc",
                alignItems: "center",

              }} className="cart-item"
            >
              <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <Link href={`/product/${logged === false || localCart === true ? img.primary_key : img.products.primary_key}`}>
                  <div style={{ position: "relative", width: "270px", height: "170px" }}>
                    <Image
                      src={logged === false || localCart === true ? img.image : img.products.image}
                      alt={logged === false || localCart === true ? img.title : img.products.title}
                      fill
                      className="cart-image"
                      style={{
                        borderRadius: "12px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Link>
              </div>

              <div className="cart-details" style={{ display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "600",
                    whiteSpace: "nowrap"
                  }}
                >

                  <Link href={`/product/${logged === false || localCart === true ? img.primary_key : img.products.primary_key}`}>
                    {logged === false || localCart === true ? img.title : img.products.title}{" "}
                  </Link>

                  {selectedColor[index] && (
                    <span style={{ fontSize: "16px", color: "#171717" }}>
                      ({selectedColor[index]})
                    </span>
                  )}
                </h2>

                <p style={{ margin: "8px 0", color: "#555" }}>
                  <span style={{ textAlign: "left", left: 0, fontSize: "13px", float: "left", display: "flex", fontSize: "16px" }}>{logged === false || localCart === true ? img.time === 1 ? "Delivery by" : "Arrives in" : img.products.time === 1 ? "Delivery by" : "Arrives in"}<span style={{ fontWeight: "bold", paddingLeft: "4px" }}>{logged === false || localCart === true ? img.time === 1 && "tomorrow" || img.time % 7 !== 0 && ` ${img.time} days` || img.time % 7 === 0 && ` ${img.time / 7} ${img.time / 7 === 1 ? `week` : `weeks`}` : img.products.time === 1 && "tomorrow" || img.products.time % 7 !== 0 && ` ${img.products.time} days` || img.products.time % 7 === 0 && ` ${img.products.time / 7} ${img.products.time / 7 === 1 ? `week` : `weeks`}`}</span></span>
                </p>

                <span className={styles.StockText} style={{ color: logged === false || localCart === true ? img.stock <= 5 && img.stock !== 0 ? "#d97706" : img.stock !== 0 ? "#16a34a" : "#94a3b8" : img.products.stock <= 5 && img.products.stock !== 0 ? "#d97706" : img.products.stock !== 0 ? "#16a34a" : "#94a3b8" }}>{logged === false || localCart === true ? img.stock <= 5 && img.stock !== 0 ? `only ${img.stock} ${img.stock > 1 ? `products left in stock ( ! )` : `product left in stock ( ! )`}` : img.stock !== 0 ? "In Stock ✓" : "Sold Out ✕" : img.products.stock <= 5 && img.products.stock !== 0 ? `only ${img.products.stock} ${img.products.stock > 1 ? `products left in stock ( ! )` : `product left in stock ( ! )`}` : img.products.stock !== 0 ? "In Stock ✓" : "Sold Out ✕"}</span>

                <div style={{ marginTop: "15px" }}>
                  <p
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    Choose Color:
                  </p>

                  <div style={{ display: "flex", gap: "8px" }}>
                    {[
                      { id: "black", src: "/colors/00.png" },
                      { id: "white", src: "/colors/01.jfif" },
                      { id: "sky", src: "/colors/02.png" },
                    ].map((color) => (
                      <img
                        key={color.id}
                        src={color.src}
                        alt={color.id}
                        onClick={() =>
                          setSelectedColor({
                            ...selectedColor,
                            [index]: color.id,
                          })
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "3px",
                          cursor: "pointer",
                          borderRadius: "8px",
                          transition: "0.2s",
                          transform:
                            selectedColor[index] === color.id ? "scale(1.07)" : "scale(1)",
                          border:
                            selectedColor[index] === color.id
                              ? "2px solid #1a75e8"
                              : "2px solid #ddd",
                          boxShadow:
                            selectedColor[index] === color.id
                              ? "0px 0px 6px rgba(0,0,0,0.2)"
                              : "none",
                          objectFit: "cover",
                          background: "white",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "#f7f7f7",
                    border: "1px solid #ddd",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
                    <b>Warranty:</b> 12 months warranty included
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    borderRadius: "10px",
                    width: "120px",
                    height: "32px",
                    border: "1px solid #999",
                  }}
                >
                  <button
                    disabled={increasingId === img.id || decreasingId === img.id}
                    onClick={() => decreaseQty(index, img)}
                    style={{
                      width: "35px",
                      height: "100%",
                      background: "white",
                      border: "0",
                      borderRight: "1px solid #ccc",
                      cursor: "pointer",
                      fontSize: "18px",
                      pointerEvents: (increasingId === img.id || decreasingId === img.id) ? "none" : "auto",
                    }}
                  >
                    -
                  </button>
                  {increasingId === img.id || decreasingId === img.id
                    ?
                    <svg className={styles.animateSpin} style={{ width: "43.33px", marginRight: "3px", height: "20px", stroke: "#000", }} viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4"></circle></svg>
                    :
                    <div
                      style={{
                        width: "50px",
                        textAlign: "center",
                        lineHeight: "32px",
                      }}
                    >
                      {img.quantity}
                    </div>}

                  <button
                    disabled={increasingId === img.id || decreasingId === img.id}
                    onClick={() => increaseQty(index, img)}
                    style={{
                      width: "35px",
                      marginLeft: increasingId === img.id || decreasingId === img.id ? "3px" : "",
                      height: "100%",
                      background: "white",
                      border: "0",
                      borderLeft: "1px solid #ccc",
                      cursor: "pointer",
                      fontSize: "18px",
                      pointerEvents: (increasingId === img.id || decreasingId === img.id) ? "none" : "auto"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-prices" style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <p style={{ margin: 0, fontSize: "18px" }}>
                  Product: <b style={{ whiteSpace: "nowrap" }}>{Number(logged === false || localCart === true ? img.price * img.quantity : img.products.price * img.quantity).toFixed(2)} SAR</b>
                </p>

                <p style={{ margin: "10px 30px 10px 0px" }}>
                  Shipping: <b>12 SAR</b>
                </p>

                <h3
                  style={{
                    marginTop: "18px",
                    color: "#171717",
                    fontSize: "24px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Total: {Number(logged === false || localCart === true ? img.price * img.quantity + 12 : img.products.price * img.quantity + 12).toFixed(2)} SAR
                </h3>
                <div className={styles.del}>
                  <button className='deletePro' style={{ backgroundColor: "white", border: "solid 1px #1a1a1a", width: "58px", height: "35px", borderRadius: "10px", cursor: "pointer", }} onClick={() => removeFromCart(index, img)}>{isRemoving === img.id ? <svg className={styles.animateSpin} style={{ width: "43.33px", height: "20px", stroke: "#000", }} viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4"></circle></svg> : <img src="https://cdn-icons-png.flaticon.com/512/484/484662.png" alt="Bin" width="16" height="17" />}</button>
                </div>
              </div>
            </li>
          ))
          }
        </ul >
      ) : (
        Loading === true ?
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
                <div className={styles.pricesSkeleton}>
                  <div className={styles.propriSkeleton}></div>
                  <div className={styles.shipSkeleton}></div>
                  <div className={styles.totalSkeleton}></div>
                  <div className={styles.deleteSkeleton}><div className={styles.deleteIconSk}></div></div>
                </div>
              </div>
            </div>
          </div>
          :
          <div style={{ textAlign: "center", marginTop: "169px" }}>
            <p style={{ fontSize: "20px" }}>
              Your cart is empty… add some items!
            </p>
          </div>

      )

      }

      {
        data6 && data6.length > 0 && (
          <div className="cart-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "900px",
              margin: "40px auto 60px auto",
            }}
          >

            <div style={{ textAlign: "right", fontSize: "23px", fontWeight: "600" }}>
              Total: {data6.length > 0 && finalPrice} SAR
            </div>


            <button onClick={CheckedOut} className={styles.cartbut}>Checkout</button>


            <button
              onClick={() => removeCart()}
              style={{
                background: "#d32f2f",
                color: "white",
                padding: "14px 26px",
                fontSize: "16px",
                borderRadius: "10px",
                cursor: "pointer",
                border: "none",
                fontWeight: "600",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                transition: "0.25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#b71c1c";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#d32f2f";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🗑️ Delete All
            </button>

          </div>
        )
      }
      <div style={{ marginTop: "135px" }}>
        <Footer />
      </div>
    </div >
  );

}